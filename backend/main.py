import os
from datetime import datetime
from typing import Any, Optional
from uuid import uuid4

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import text
from sqlalchemy.orm import Session

try:
    from .database import Base, SessionLocal, engine, get_db
    from .models import AssessmentResult, Application, CandidateStatus, Opportunity, User
    from .auth import authenticate, create_token, create_user, get_current_user, require_role, user_payload
except ImportError:
    from database import Base, SessionLocal, engine, get_db
    from models import AssessmentResult, Application, CandidateStatus, Opportunity, User
    from auth import authenticate, create_token, create_user, get_current_user, require_role, user_payload

APP_NAME = 'SkillBridge API'
DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'

app = FastAPI(
    title=APP_NAME,
    description='FastAPI + MySQL backend for SkillBridge: authentication, profiles, skill assessment, opportunities, applications and candidate matching.',
    version='3.0.0',
)


def parse_origins():
    raw = os.getenv('CORS_ORIGINS', 'http://localhost:5173,http://localhost:3000')
    return [origin.strip().rstrip('/') for origin in raw.split(',') if origin.strip()]


origins = parse_origins()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r'https?://(localhost|127\.0\.0\.1)(:\d+)?',
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'OPTIONS'],
    allow_headers=['Authorization', 'Content-Type'],
)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str
    name: Optional[str] = ''


class OpportunityCreateRequest(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    company: Optional[str] = 'Novex Technologies'
    type: Optional[str] = 'Internship'
    location: Optional[str] = 'Remote'
    compensation: Optional[str] = 'Stipend Offered'
    description: Optional[str] = ''
    skills: Optional[Any] = ['React', 'Python']
    requirements: Optional[Any] = []
    responsibilities: Optional[Any] = []
    deadline: Optional[str] = 'Open'


class ApplicationCreateRequest(BaseModel):
    opportunity_id: str


class ProfileUpdateRequest(BaseModel):
    profile: dict[str, Any] = Field(default_factory=dict)


class AssessmentSubmitRequest(BaseModel):
    score: int = Field(..., ge=0, le=100)
    correct_count: int = Field(..., ge=0)
    total_count: int = Field(..., ge=1)
    strengths: list[str] = []
    weak_areas: list[str] = []
    recommended_skills: list[str] = []


class CandidateStatusRequest(BaseModel):
    status: str = Field(..., min_length=1, max_length=50)


def default_profile(role: str, user: User) -> dict[str, Any]:
    if role == 'student':
        return {
            'name': user.name,
            'email': user.email,
            'role': 'student',
            'profileCompletion': 20,
            'avatar': user.avatar or DEFAULT_AVATAR,
            'college': '',
            'department': '',
            'gpa': '',
            'graduationYear': datetime.utcnow().year + 4,
            'skills': {'technical': [], 'soft': []},
            'careerPath': {'role': 'Frontend Engineer', 'readiness': 0, 'requiredSkillsCount': 0, 'acquiredSkillsCount': 0},
            'certifications': [],
            'projects': [],
            'resume': None,
            'assessmentCompleted': False,
        }
    if role == 'industry':
        return {
            'companyName': user.name,
            'representative': user.name,
            'role': 'industry',
            'industrySector': 'Technology',
            'activePostingsCount': 0,
            'totalApplicantsCount': 0,
            'shortlistedCount': 0,
            'averageMatchScore': 0,
            'avatar': user.avatar or DEFAULT_AVATAR,
        }
    if role == 'institution':
        return {
            'name': user.name,
            'representative': user.name,
            'role': 'institution',
            'totalStudentsCount': 0,
            'assessedStudentsCount': 0,
            'averageSkillScore': 0,
            'placementRate': 0,
            'internshipParticipation': 0,
            'avatar': user.avatar or DEFAULT_AVATAR,
        }
    return {
        'name': user.name,
        'email': user.email,
        'role': 'academician',
        'department': 'Computer Science',
        'researchInterests': [],
        'activeCollaborationsCount': 0,
        'avatar': user.avatar or DEFAULT_AVATAR,
        'institution': '',
    }


def merged_profile(user: User) -> dict[str, Any]:
    base = default_profile(user.role, user)
    stored = user.profile_data if isinstance(user.profile_data, dict) else {}
    merged = {**base, **stored}
    merged['name'] = user.name
    merged['email'] = user.email
    merged['role'] = user.role
    merged['avatar'] = user.avatar or merged.get('avatar') or DEFAULT_AVATAR
    return merged


def as_list(value, fallback=None):
    fallback = fallback or []
    if isinstance(value, list):
        return value
    if isinstance(value, str) and value.strip():
        return [x.strip() for x in value.replace(',', '\n').splitlines() if x.strip()]
    return fallback


def skill_names(profile: dict[str, Any]) -> set[str]:
    result = set()
    skills = profile.get('skills') or {}
    for group in ('technical', 'soft'):
        for skill in skills.get(group, []) if isinstance(skills.get(group), list) else []:
            if isinstance(skill, dict) and skill.get('name'):
                result.add(skill['name'].strip().lower())
            elif isinstance(skill, str):
                result.add(skill.strip().lower())
    return result


def calculate_match(profile: dict[str, Any], required_skills: list[str]) -> int:
    required = {str(s).strip().lower() for s in required_skills if str(s).strip()}
    if not required:
        return 0
    matched = len(required & skill_names(profile))
    return round((matched / len(required)) * 100)


def opportunity_response(item: Opportunity, match_score: int = 0) -> dict:
    return {
        'id': str(item.id),
        'title': item.title,
        'company': item.company_name,
        'type': item.type,
        'location': item.location,
        'compensation': item.stipend or 'Stipend Offered',
        'skills': item.required_skills or [],
        'description': item.description or '',
        'requirements': item.requirements or [],
        'responsibilities': item.responsibilities or [],
        'postedDate': item.created_at.strftime('%b %d, %Y') if item.created_at else 'Just now',
        'deadline': item.deadline or 'Open',
        'matchScore': match_score,
    }


def seed_opportunities(db: Session):
    if db.query(Opportunity).count() > 0:
        return
    seed = [
        {
            'title': 'Frontend Engineering Intern', 'company': 'Novex Technologies', 'type': 'Internship',
            'location': 'Remote / Hybrid', 'compensation': 'Stipend Offered',
            'skills': ['React', 'JavaScript', 'Git', 'REST APIs'],
            'description': 'Build production web interfaces with a modern frontend team.',
            'requirements': ['Strong HTML, CSS and JavaScript fundamentals', 'React experience', 'Git and API integration familiarity'],
            'responsibilities': ['Build responsive UI components', 'Participate in code reviews and testing'], 'deadline': 'Open',
        },
        {
            'title': 'Junior Fullstack Developer', 'company': 'Synergy Systems', 'type': 'Full-time',
            'location': 'Hybrid', 'compensation': 'Competitive Salary',
            'skills': ['React', 'JavaScript', 'SQL', 'REST APIs', 'Git'],
            'description': 'Work across frontend applications and backend services.',
            'requirements': ['JavaScript and SQL proficiency', 'Understanding of REST APIs', 'Basic web security knowledge'],
            'responsibilities': ['Implement product features', 'Build and maintain APIs'], 'deadline': 'Open',
        },
        {
            'title': 'Machine Learning Research Associate', 'company': 'Apex AI Research', 'type': 'Apprenticeship',
            'location': 'Remote', 'compensation': 'Stipend Offered',
            'skills': ['Python', 'Data Structures', 'SQL'],
            'description': 'Support applied machine learning research and experimentation.',
            'requirements': ['Python fundamentals', 'Data structures knowledge', 'Basic statistics'],
            'responsibilities': ['Prepare datasets', 'Run experiments and document results'], 'deadline': 'Open',
        },
    ]
    for item in seed:
        db.add(Opportunity(
            id=str(uuid4()), title=item['title'], company_name=item['company'], type=item['type'],
            location=item['location'], stipend=item['compensation'], description=item['description'],
            required_skills=item['skills'], requirements=item['requirements'], responsibilities=item['responsibilities'],
            deadline=item['deadline'], created_by=None,
        ))
    db.commit()


@app.on_event('startup')
def startup():
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_opportunities(db)


@app.get('/')
def read_root(db: Session = Depends(get_db)):
    try:
        db.execute(text('SELECT 1'))
        db_status = 'mysql'
    except Exception:
        db_status = 'mysql_unavailable'
    return {'status': 'online', 'service': APP_NAME, 'database': db_status, 'docs': '/docs'}


@app.get('/health')
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text('SELECT 1'))
        return {'status': 'healthy', 'database': 'mysql'}
    except Exception:
        raise HTTPException(status_code=503, detail='MySQL unavailable.')


@app.post('/auth/login')
def login(body: LoginRequest, db: Session = Depends(get_db)):
    try:
        user = authenticate(db, body.email, body.password, body.role)
        return {'user': user_payload(user), 'token': create_token(user)}
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc).strip("'"))
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc))


@app.post('/auth/signup')
def signup(body: SignupRequest, db: Session = Depends(get_db)):
    try:
        user = create_user(db, body.email, body.password, body.role, body.name or '', DEFAULT_AVATAR)
        return {'user': user_payload(user), 'token': create_token(user)}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@app.get('/auth/me')
def me(user: User = Depends(get_current_user)):
    return {'user': user_payload(user)}


@app.post('/auth/logout')
def logout():
    return {'message': 'Logged out successfully'}


@app.get('/api/profile')
def get_profile(user: User = Depends(get_current_user)):
    return merged_profile(user)


@app.put('/api/profile')
def update_profile(body: ProfileUpdateRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    existing = user.profile_data if isinstance(user.profile_data, dict) else {}
    merged = {**existing, **body.profile}
    user.profile_data = merged
    if body.profile.get('name'):
        user.name = str(body.profile['name']).strip() or user.name
    db.add(user)
    db.commit()
    db.refresh(user)
    return merged_profile(user)


@app.post('/api/assessments')
def submit_assessment(body: AssessmentSubmitRequest, db: Session = Depends(get_db), user: User = Depends(require_role('student'))):
    result = AssessmentResult(
        id=str(uuid4()), student_id=user.id, score=body.score, correct_count=body.correct_count,
        total_count=body.total_count, strengths=body.strengths, weak_areas=body.weak_areas,
        recommended_skills=body.recommended_skills,
    )
    db.add(result)
    profile = merged_profile(user)
    profile['assessmentCompleted'] = True
    profile.setdefault('careerPath', {})['readiness'] = body.score
    profile['careerPath']['acquiredSkillsCount'] = sum(
        1 for skill in profile.get('skills', {}).get('technical', [])
        if isinstance(skill, dict) and skill.get('current', 0) >= skill.get('required', 0)
    )
    profile['careerPath']['requiredSkillsCount'] = len(profile.get('skills', {}).get('technical', []))
    user.profile_data = {k: v for k, v in profile.items() if k not in {'name', 'email', 'role', 'avatar'}}
    db.commit()
    return {
        'score': body.score, 'correctCount': body.correct_count, 'totalCount': body.total_count,
        'strengths': body.strengths, 'weakAreas': body.weak_areas, 'recommendedSkills': body.recommended_skills,
        'careerReadiness': body.score,
    }


@app.get('/api/assessments/latest')
def latest_assessment(db: Session = Depends(get_db), user: User = Depends(require_role('student'))):
    result = db.query(AssessmentResult).filter(AssessmentResult.student_id == user.id).order_by(AssessmentResult.created_at.desc()).first()
    if not result:
        return None
    return {
        'score': result.score, 'correctCount': result.correct_count, 'totalCount': result.total_count,
        'strengths': result.strengths or [], 'weakAreas': result.weak_areas or [],
        'recommendedSkills': result.recommended_skills or [], 'createdAt': result.created_at.isoformat(),
    }


@app.get('/api/opportunities')
def get_opportunities(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    opportunities = db.query(Opportunity).order_by(Opportunity.created_at.desc()).all()
    profile = merged_profile(user)
    return [opportunity_response(o, calculate_match(profile, o.required_skills or [])) for o in opportunities]


@app.post('/api/opportunities')
def post_opportunity(body: OpportunityCreateRequest, db: Session = Depends(get_db), user: User = Depends(require_role('industry'))):
    skills = as_list(body.skills, ['React', 'Python'])
    requirements = as_list(body.requirements, ['Proficient in core domain tools'])
    responsibilities = as_list(body.responsibilities, ['Collaborate with technical team', 'Deliver project milestones'])
    record = Opportunity(
        id=str(uuid4()), title=body.title.strip(), company_name=body.company or user.name,
        type=body.type or 'Internship', location=body.location or 'Remote', stipend=body.compensation or 'Stipend Offered',
        description=body.description or '', required_skills=skills, requirements=requirements,
        responsibilities=responsibilities, deadline=body.deadline or 'Open', created_by=user.id,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return opportunity_response(record, 0)


@app.post('/api/applications')
def apply_opportunity(body: ApplicationCreateRequest, db: Session = Depends(get_db), user: User = Depends(require_role('student'))):
    opportunity = db.query(Opportunity).filter(Opportunity.id == body.opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail='Opportunity not found.')
    existing = db.query(Application).filter(Application.opportunity_id == opportunity.id, Application.student_id == user.id).first()
    if existing:
        raise HTTPException(status_code=409, detail='You have already applied for this position.')
    score = calculate_match(merged_profile(user), opportunity.required_skills or [])
    record = Application(id=str(uuid4()), opportunity_id=opportunity.id, student_id=user.id, status='Under Review', match_score=score)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {
        'id': record.id, 'opportunity_id': record.opportunity_id, 'student_id': record.student_id,
        'status': record.status, 'matchScore': record.match_score,
        'applied_at': record.applied_at.isoformat() if record.applied_at else datetime.utcnow().isoformat(),
    }


@app.get('/api/applications')
def get_my_applications(db: Session = Depends(get_db), user: User = Depends(require_role('student'))):
    records = db.query(Application).filter(Application.student_id == user.id).order_by(Application.applied_at.desc()).all()
    return [
        {
            'id': a.id, 'opportunityId': a.opportunity_id,
            'title': a.opportunity.title if a.opportunity else '',
            'company': a.opportunity.company_name if a.opportunity else '',
            'type': a.opportunity.type if a.opportunity else '', 'status': a.status,
            'matchScore': a.match_score,
            'appliedDate': a.applied_at.strftime('%b %d, %Y') if a.applied_at else '',
        }
        for a in records
    ]


@app.get('/api/candidates')
def get_candidates(db: Session = Depends(get_db), industry: User = Depends(require_role('industry'))):
    students = db.query(User).filter(User.role == 'student').all()
    opportunities = db.query(Opportunity).filter(Opportunity.created_by == industry.id).order_by(Opportunity.created_at.desc()).all()
    required = opportunities[0].required_skills if opportunities else []
    result = []
    for student in students:
        profile = merged_profile(student)
        score = calculate_match(profile, required)
        student_skills = skill_names(profile)
        required_set = {str(s).strip().lower() for s in required}
        matched = [s for s in required if str(s).strip().lower() in student_skills]
        missing = [s for s in required if str(s).strip().lower() not in student_skills]
        assessment = db.query(AssessmentResult).filter(AssessmentResult.student_id == student.id).order_by(AssessmentResult.created_at.desc()).first()
        status_row = db.query(CandidateStatus).filter(CandidateStatus.industry_id == industry.id, CandidateStatus.student_id == student.id).first()
        result.append({
            'id': student.id, 'name': student.name,
            'college': profile.get('college') or 'Not provided', 'gpa': profile.get('gpa') or '—',
            'matchScore': score, 'skills': {'matched': matched, 'missing': missing},
            'assessmentScore': f"{assessment.score}%" if assessment else 'Not assessed',
            'topSkills': [s.get('name') for s in profile.get('skills', {}).get('technical', []) if isinstance(s, dict)][:6],
            'interest': profile.get('careerPath', {}).get('role', 'Career interest not set'),
            'status': status_row.status if status_row else 'None',
            'avatar': profile.get('avatar') or DEFAULT_AVATAR,
        })
    result.sort(key=lambda item: item['matchScore'], reverse=True)
    return result


@app.put('/api/candidates/{student_id}/status')
def update_candidate_status(student_id: str, body: CandidateStatusRequest, db: Session = Depends(get_db), industry: User = Depends(require_role('industry'))):
    student = db.query(User).filter(User.id == student_id, User.role == 'student').first()
    if not student:
        raise HTTPException(status_code=404, detail='Student not found.')
    row = db.query(CandidateStatus).filter(CandidateStatus.industry_id == industry.id, CandidateStatus.student_id == student_id).first()
    if row:
        row.status = body.status
    else:
        row = CandidateStatus(id=str(uuid4()), industry_id=industry.id, student_id=student_id, status=body.status)
        db.add(row)
    db.commit()
    return get_candidates(db, industry)


@app.get('/api/institution/students')
def institution_students(db: Session = Depends(get_db), institution: User = Depends(require_role('institution'))):
    students = db.query(User).filter(User.role == 'student').order_by(User.name.asc()).all()
    rows = []
    for student in students:
        profile = merged_profile(student)
        readiness = profile.get('careerPath', {}).get('readiness', 0)
        rows.append({
            'id': student.id, 'name': student.name, 'department': profile.get('department') or 'Not provided',
            'skillScore': readiness, 'assessmentStatus': 'Completed' if profile.get('assessmentCompleted') else 'Pending',
            'internshipStatus': 'None', 'placementReadiness': 'Ready' if readiness >= 75 else ('Almost Ready' if readiness >= 50 else 'Needs Development'),
            'gpa': profile.get('gpa') or '—',
        })
    return rows


@app.get('/api/institution/analytics')
def institution_analytics(db: Session = Depends(get_db), institution: User = Depends(require_role('institution'))):
    students = db.query(User).filter(User.role == 'student').all()
    scores = [merged_profile(s).get('careerPath', {}).get('readiness', 0) for s in students]
    average = round(sum(scores) / len(scores), 1) if scores else 0
    assessed = sum(1 for s in students if merged_profile(s).get('assessmentCompleted'))
    return {
        'totalStudentsCount': len(students), 'assessedStudentsCount': assessed,
        'averageSkillScore': average, 'placementRate': 0, 'internshipParticipation': 0,
        'skillsGap': [], 'placementReadiness': [
            {'name': 'Ready', 'value': sum(1 for x in scores if x >= 75), 'fill': '#22c55e'},
            {'name': 'Almost Ready', 'value': sum(1 for x in scores if 50 <= x < 75), 'fill': '#3b82f6'},
            {'name': 'Needs Development', 'value': sum(1 for x in scores if x < 50), 'fill': '#ef4444'},
        ], 'participationTimeline': [],
    }


@app.get('/api/academician/overview')
def academician_overview(user: User = Depends(require_role('academician'))):
    return {
        'profile': merged_profile(user),
        'opportunities': [
            {'id': 'collab-1', 'category': 'Industry Research', 'title': 'Applied AI Industry Fellowship', 'sponsor': 'Industry Partner', 'duration': '12 Weeks', 'status': 'Recommended', 'description': 'Collaborate with industry mentors on an applied AI research project.', 'stipend': 'Partner funded'},
            {'id': 'collab-2', 'category': 'Faculty Development', 'title': 'Industry 4.0 Curriculum Workshop', 'sponsor': 'SkillBridge Network', 'duration': '4 Weeks', 'status': 'Open', 'description': 'Align curriculum outcomes with emerging industry skill requirements.', 'stipend': 'Sponsored'},
        ],
        'collaborations': [],
    }


if __name__ == '__main__':
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 8000))
    uvicorn.run('backend.main:app', host=host, port=port, reload=os.getenv('ENVIRONMENT', 'development') != 'production')
