from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ================================
# 🔹 ROUTERS
# ================================
from routers.resume_routes import router as resume_router
from routers.match_routes import router as match_router
from routers.history_routes import router as history_router
from routers.chat_routes import router as chat_router

# 🔥 JOB RECOMMENDER
from job_recommender import get_recommended_jobs

# ================================
# 🔹 DATABASE
# ================================
from database import engine, Base

# Create DB Tables
Base.metadata.create_all(bind=engine)

# ================================
# 🔹 FASTAPI APP
# ================================
app = FastAPI(
    title="HireSmart AI Backend 🚀",
    version="2.0.0",
    description="AI-powered ATS Resume Screening & AI Career Assistant"
)

# ================================
# 🔹 CORS
# ================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later change to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================================
# 🔹 INCLUDE ROUTERS
# ================================
app.include_router(
    resume_router,
    tags=["Resume"]
)

app.include_router(
    match_router,
    tags=["Matching"]
)

app.include_router(
    history_router,
    tags=["History"]
)

# 🔥 GEMINI AI CHATBOT
app.include_router(
    chat_router,
    tags=["AI Chatbot"]
)

# ================================
# 🔥 RECOMMENDED JOBS ROUTE
# ================================
@app.get("/recommended-jobs")
def recommended_jobs():

    try:

        # Temporary test skills
        skills = ["python", "java", "sql"]

        jobs = get_recommended_jobs(skills)

        return {
            "success": True,
            "skills": skills,
            "recommended_jobs": jobs
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

# ================================
# 🔹 HEALTH CHECK
# ================================
@app.get("/health")
def health_check():

    return {
        "status": "Backend is running ✅"
    }

# ================================
# 🔹 ROOT ROUTE
# ================================
@app.get("/")
def home():

    return {
        "message": "HireSmart AI Backend Running 🚀"
    }