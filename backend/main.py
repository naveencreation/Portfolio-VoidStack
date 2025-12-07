from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from database import get_db, engine, Base
from models import (
    Profile, Education, Experience, Responsibility, 
    Project, SkillCategory, Skill, Certification, ContactMessage
)
from schemas import (
    ProfileResponse, EducationResponse, ExperienceResponse,
    ProjectResponse, SkillCategoryResponse, CertificationResponse,
    ContactMessageCreate, ContactMessageResponse, PortfolioResponse
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Naveen S Portfolio API",
    description="API for personal portfolio website",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


@app.get("/api/portfolio", response_model=PortfolioResponse)
def get_portfolio(db: Session = Depends(get_db)):
    profile = db.query(Profile).first()
    education = db.query(Education).all()
    experiences = db.query(Experience).all()
    projects = db.query(Project).all()
    skill_categories = db.query(SkillCategory).all()
    certifications = db.query(Certification).all()
    
    return PortfolioResponse(
        profile=profile,
        education=education,
        experiences=experiences,
        projects=projects,
        skill_categories=skill_categories,
        certifications=certifications
    )


@app.get("/api/profile", response_model=ProfileResponse)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@app.get("/api/education", response_model=List[EducationResponse])
def get_education(db: Session = Depends(get_db)):
    return db.query(Education).all()


@app.get("/api/experience", response_model=List[ExperienceResponse])
def get_experience(db: Session = Depends(get_db)):
    return db.query(Experience).all()


@app.get("/api/projects", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@app.get("/api/skills", response_model=List[SkillCategoryResponse])
def get_skills(db: Session = Depends(get_db)):
    return db.query(SkillCategory).all()


@app.get("/api/certifications", response_model=List[CertificationResponse])
def get_certifications(db: Session = Depends(get_db)):
    return db.query(Certification).all()


@app.post("/api/contact", response_model=ContactMessageResponse)
def submit_contact(message: ContactMessageCreate, db: Session = Depends(get_db)):
    db_message = ContactMessage(
        name=message.name,
        email=message.email,
        message=message.message,
        created_at=datetime.now().isoformat()
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
