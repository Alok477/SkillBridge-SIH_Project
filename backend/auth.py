import os
from datetime import datetime, timedelta, timezone
from uuid import uuid4

import bcrypt
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

try:
    from .database import get_db
    from .models import User
except ImportError:
    from database import get_db
    from models import User

JWT_SECRET = os.getenv('JWT_SECRET', '').strip()
JWT_ALGORITHM = 'HS256'
JWT_EXPIRE_MINUTES = int(os.getenv('JWT_EXPIRE_MINUTES', '1440'))
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development').lower()
ALLOWED_ROLES = {'student', 'industry', 'institution', 'academician'}
security = HTTPBearer(auto_error=False)

if not JWT_SECRET and ENVIRONMENT == 'production':
    raise RuntimeError('JWT_SECRET must be set in production.')
if not JWT_SECRET:
    JWT_SECRET = 'local-development-only-change-me'


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def create_token(user: User) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        'sub': user.id,
        'email': user.email,
        'role': user.role,
        'iat': now,
        'exp': now + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def user_payload(user: User) -> dict:
    return {
        'id': user.id,
        'email': user.email,
        'role': user.role,
        'name': user.name,
        'avatar': user.avatar,
    }


def create_user(db: Session, email: str, password: str, role: str, name: str, avatar: str | None = None) -> User:
    email = email.strip().lower()
    role = role.strip().lower()
    if role not in ALLOWED_ROLES:
        raise ValueError('Invalid role.')
    if db.query(User).filter(User.email == email).first():
        raise ValueError('An account with this email address already exists. Please sign in.')

    user = User(
        id=str(uuid4()),
        email=email,
        password_hash=hash_password(password),
        name=name.strip() or email.split('@')[0].replace('.', ' ').title(),
        role=role,
        avatar=avatar,
        profile_data={},
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate(db: Session, email: str, password: str, role: str) -> User:
    user = db.query(User).filter(User.email == email.strip().lower()).first()
    if not user:
        raise KeyError('Account not registered. Please sign up to create an account.')
    if not verify_password(password, user.password_hash):
        raise ValueError('Invalid email or password.')
    if role and user.role != role.strip().lower():
        raise ValueError('The selected role does not match this account.')
    return user


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication required.')
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get('sub')
        if not user_id:
            raise ValueError()
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid or expired token.')

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User no longer exists.')
    return user


def require_role(*roles: str):
    allowed = set(roles)

    def dependency(user: User = Depends(get_current_user)) -> User:
        if user.role not in allowed:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You do not have permission for this action.')
        return user

    return dependency
