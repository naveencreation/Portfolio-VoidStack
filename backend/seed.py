"""
Seed script to populate database with Naveen's portfolio data
"""
from database import SessionLocal, engine, Base
from models import (
    Profile, Education, Experience, Responsibility,
    Project, SkillCategory, Skill, Certification
)

# Create tables
Base.metadata.create_all(bind=engine)


def seed_database():
    db = SessionLocal()
    
    # Clear existing data
    db.query(Responsibility).delete()
    db.query(Skill).delete()
    db.query(SkillCategory).delete()
    db.query(Certification).delete()
    db.query(Project).delete()
    db.query(Experience).delete()
    db.query(Education).delete()
    db.query(Profile).delete()
    db.commit()
    
    # Profile
    profile = Profile(
        name="Naveen S",
        title="AI Engineer | Full-Stack Developer",
        tagline="Building intelligent systems and scalable applications with AI/ML, FastAPI, React, and LLM technologies",
        about="""I'm an AI Engineering Intern at Thapovan @ Prayag.ai, where I build intelligent systems and scalable backend architectures. Currently pursuing my B.Tech in Artificial Intelligence and Data Science at Karpagam College of Engineering with a CGPA of 8.45.

My passion lies at the intersection of AI/ML and software engineering. I specialize in building production-ready applications that leverage the power of Large Language Models, real-time data processing, and modern web technologies.

When I'm not coding, you'll find me exploring new AI research papers, contributing to open-source projects, or solving algorithmic challenges on LeetCode.""",
        email="naveenselvan0004@gmail.com",
        phone="7010689737",
        linkedin="https://linkedin.com/in/naveen0004",
        github="https://github.com/naveencreation",
        leetcode="https://leetcode.com/u/naveenselvan"
    )
    db.add(profile)
    
    # Education
    education = Education(
        institution="Karpagam College of Engineering",
        degree="B.Tech in Artificial Intelligence and Data Science",
        cgpa="8.45",
        start_year="2022",
        end_year="2026",
        location="Coimbatore, India"
    )
    db.add(education)
    
    # Experience
    experience = Experience(
        title="AI Engineering Intern",
        company="Thapovan @ Prayag.ai",
        location="India",
        start_date="Apr 2024",
        end_date="Present",
        description="Building AI-powered products and scalable backend systems",
        technologies="FastAPI,Node.js,React,Redis,PostgreSQL,OpenAI,Gemini"
    )
    db.add(experience)
    db.flush()
    
    # Responsibilities
    responsibilities = [
        "Engineered backend services for AI Notetaker, a scalable meeting intelligence platform using FastAPI, Node.js, React, Redis, and PostgreSQL.",
        "Implemented secure authentication using JWT, HTTP-only cookies, session state, and token refresh for robust multi-session security.",
        "Integrated OpenAI GPT-4/4o/4.1, Gemini 1.5/2.0, and LLM Agents for summarization, topic extraction, and workflow automation.",
        "Built pipelines for sentiment analysis, semantic search, embeddings, vector similarity, and document processing.",
        "Designed multi-agent orchestration for task routing, structured outputs, and contextual memory.",
        "Optimized real-time transcription and inference using Redis caching, pub/sub, and async background workers.",
        "Collaborated in Agile sprints, contributing to CI/CD, code reviews, and system architecture."
    ]
    for resp in responsibilities:
        db.add(Responsibility(experience_id=experience.id, description=resp))
    
    # Projects
    projects = [
        Project(
            title="AI Notetaker (Prayag.ai)",
            description="A scalable meeting intelligence platform that leverages AI to transform meetings into actionable insights.",
            technologies="React,Node.js,FastAPI,Redis,PostgreSQL,OpenAI,Gemini",
            highlights='["Integrated OpenAI Agents and Gemini models for meeting summaries, action items, and contextual insights","Implemented RAG pipelines, sentiment analysis, and multi-format document ingestion","Built multi-agent workflow: transcription → understanding → summarization → output","Reduced inference latency by 30% using Redis caching and async processing"]',
            link="https://prayag.ai",
            is_featured=1
        ),
        Project(
            title="Vehicle Routing Optimization",
            description="A Genetic Algorithm-based solver for the Vehicle Routing Problem (VRP). Tackles large-scale NP-hard optimization problems.",
            technologies="Python,DEAP,Genetic Algorithm",
            highlights='["Built GA-based solver reducing route cost by 30%","Implemented custom crossover, mutation, and fitness strategies"]',
            github="https://github.com/naveencreation",
            is_featured=0
        ),
        Project(
            title="AutoML Framework",
            description="An automated machine learning pipeline for data cleaning, feature engineering, model selection, and training.",
            technologies="Python,Streamlit,Scikit-learn,TensorFlow",
            highlights='["Improved prediction accuracy by 20%","Reduced preprocessing time by 30%"]',
            github="https://github.com/naveencreation",
            is_featured=0
        )
    ]
    for project in projects:
        db.add(project)
    
    # Skills
    skill_data = [
        ("Languages", "code", [("Python", 95), ("JavaScript", 85), ("Java", 70), ("SQL", 85)]),
        ("Frameworks", "framework", [("FastAPI", 90), ("Node.js", 85), ("React.js", 85), ("Express", 80), ("Streamlit", 80), ("Scikit-learn", 85), ("TensorFlow", 75)]),
        ("Databases", "database", [("PostgreSQL", 90), ("Redis", 85), ("MongoDB", 75), ("MySQL", 80)]),
        ("AI & LLM", "ai", [("OpenAI GPT-4", 90), ("Gemini", 85), ("LLM Agents", 85), ("Prompt Engineering", 90), ("Embeddings", 85), ("Vector Search", 85), ("RAG", 90), ("Sentiment Analysis", 85)]),
        ("Core Skills", "core", [("API Development", 90), ("Authentication", 85), ("Microservices", 85), ("Caching", 85), ("Distributed Systems", 80), ("Real-Time Processing", 85), ("CI/CD", 80)]),
        ("Developer Tools", "tools", [("Docker", 80), ("Git", 90), ("GitHub Actions", 80), ("Postman", 85), ("Linux", 80), ("VS Code", 90)])
    ]
    
    for cat_name, icon, skills in skill_data:
        category = SkillCategory(name=cat_name, icon=icon)
        db.add(category)
        db.flush()
        for skill_name, proficiency in skills:
            db.add(Skill(category_id=category.id, name=skill_name, proficiency=proficiency))
    
    # Certifications
    certifications = [
        Certification(title="Business Analyst Qualification", issuer="Qlik"),
        Certification(title="Python for Data Science", issuer="NPTEL"),
        Certification(title="Data Analytics with Python", issuer="NPTEL"),
        Certification(title="Big Data Computing", issuer="NPTEL")
    ]
    for cert in certifications:
        db.add(cert)
    
    db.commit()
    db.close()
    print("✅ Database seeded successfully!")


if __name__ == "__main__":
    seed_database()
