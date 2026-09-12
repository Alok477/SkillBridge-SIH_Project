import os
from pathlib import Path
from urllib.parse import quote_plus

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / '.env', override=False)

# Railway exposes MYSQLHOST/MYSQLPORT/MYSQLUSER/MYSQLPASSWORD/MYSQLDATABASE.
# Local development uses the MYSQL_* names from .env.example.
MYSQL_HOST = os.getenv('MYSQL_HOST') or os.getenv('MYSQLHOST') or 'localhost'
MYSQL_PORT = os.getenv('MYSQL_PORT') or os.getenv('MYSQLPORT') or '3306'
MYSQL_USER = os.getenv('MYSQL_USER') or os.getenv('MYSQLUSER') or 'root'
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD') or os.getenv('MYSQLPASSWORD') or ''
MYSQL_DATABASE = os.getenv('MYSQL_DATABASE') or os.getenv('MYSQLDATABASE') or 'academia_portal'

DATABASE_URL = os.getenv('DATABASE_URL') or os.getenv('MYSQL_URL')
if not DATABASE_URL:
    encoded_user = quote_plus(MYSQL_USER)
    encoded_password = quote_plus(MYSQL_PASSWORD)
    DATABASE_URL = (
        f'mysql+pymysql://{encoded_user}:{encoded_password}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}'
        f'?charset=utf8mb4'
    )

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=280,
    pool_size=int(os.getenv('DB_POOL_SIZE', '5')),
    max_overflow=int(os.getenv('DB_MAX_OVERFLOW', '5')),
    future=True,
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
