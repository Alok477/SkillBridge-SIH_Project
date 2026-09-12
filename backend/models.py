from datetime import datetime

from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.orm import relationship

try:
    from .database import Base
except ImportError:
    from database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(30), nullable=False, index=True)
    avatar = Column(Text, nullable=True)
    profile_data = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    opportunities = relationship('Opportunity', back_populates='creator')
    applications = relationship('Application', back_populates='student')
    assessment_results = relationship('AssessmentResult', back_populates='student', cascade='all, delete-orphan')
    shortlist_records = relationship('CandidateStatus', foreign_keys='CandidateStatus.student_id', back_populates='student', cascade='all, delete-orphan')
    industry_shortlists = relationship('CandidateStatus', foreign_keys='CandidateStatus.industry_id', back_populates='industry', cascade='all, delete-orphan')


class Opportunity(Base):
    __tablename__ = 'opportunities'

    id = Column(String(36), primary_key=True)
    title = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False, default='Internship')
    location = Column(String(255), nullable=False, default='Remote')
    stipend = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    required_skills = Column(JSON, nullable=False)
    requirements = Column(JSON, nullable=False)
    responsibilities = Column(JSON, nullable=False)
    deadline = Column(String(100), nullable=True)
    created_by = Column(String(36), ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

    creator = relationship('User', back_populates='opportunities')
    applications = relationship('Application', back_populates='opportunity', cascade='all, delete-orphan')


class Application(Base):
    __tablename__ = 'applications'
    __table_args__ = (UniqueConstraint('opportunity_id', 'student_id', name='uq_opportunity_student'),)

    id = Column(String(36), primary_key=True)
    opportunity_id = Column(String(36), ForeignKey('opportunities.id', ondelete='CASCADE'), nullable=False, index=True)
    student_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    status = Column(String(50), nullable=False, default='Under Review')
    match_score = Column(Integer, nullable=False, default=0)
    applied_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    opportunity = relationship('Opportunity', back_populates='applications')
    student = relationship('User', back_populates='applications')


class AssessmentResult(Base):
    __tablename__ = 'assessment_results'

    id = Column(String(36), primary_key=True)
    student_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    score = Column(Integer, nullable=False)
    correct_count = Column(Integer, nullable=False)
    total_count = Column(Integer, nullable=False)
    strengths = Column(JSON, nullable=False, default=list)
    weak_areas = Column(JSON, nullable=False, default=list)
    recommended_skills = Column(JSON, nullable=False, default=list)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    student = relationship('User', back_populates='assessment_results')


class CandidateStatus(Base):
    __tablename__ = 'candidate_statuses'
    __table_args__ = (UniqueConstraint('industry_id', 'student_id', name='uq_industry_student'),)

    id = Column(String(36), primary_key=True)
    industry_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    student_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    status = Column(String(50), nullable=False, default='None')
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    industry = relationship('User', foreign_keys=[industry_id], back_populates='industry_shortlists')
    student = relationship('User', foreign_keys=[student_id], back_populates='shortlist_records')
