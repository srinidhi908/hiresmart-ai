from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# =========================================
# REQUEST MODEL
# =========================================
class ChatRequest(BaseModel):
    message: str
    results: dict

# =========================================
# CHATBOT ROUTE
# =========================================
@router.post("/chat")
def chat_bot(data: ChatRequest):

    msg = data.message.lower()

    result = data.results

    matched_skills = result.get("matched_skills", [])
    missing_skills = result.get("missing_skills", [])
    suggestions = result.get("suggestions", [])
    score = result.get("match_score_percent", 0)

    # =========================================
    # PROJECT SUGGESTIONS
    # =========================================
    if "project" in msg:

        if "python" in matched_skills:
            return {
                "reply": """
✅ Recommended Python Projects:

1. AI Resume Analyzer
2. Chatbot using Python
3. Face Detection System
4. Voice Assistant
5. Weather App using API

These projects improve your resume strongly 🚀
"""
            }

        elif "java" in matched_skills:
            return {
                "reply": """
✅ Recommended Java Projects:

1. Student Management System
2. Banking Application
3. Online Quiz App
4. Library Management System
5. Employee Payroll System

These projects help for Java developer roles 🚀
"""
            }

        else:
            return {
                "reply": """
✅ Beginner Projects:

1. Portfolio Website
2. Calculator App
3. To-Do List
4. Weather App
5. Resume Builder

Start with these projects 🚀
"""
            }

    # =========================================
    # SKILLS QUESTIONS
    # =========================================
    elif "skills" in msg:

        return {
            "reply": f"""
✅ Your Matched Skills:
{', '.join(matched_skills) if matched_skills else 'No matched skills'}

❌ Missing Skills:
{', '.join(missing_skills) if missing_skills else 'No missing skills'}

Learn missing skills to improve your resume 🚀
"""
        }

    # =========================================
    # ATS QUESTIONS
    # =========================================
    elif "ats" in msg or "resume" in msg:

        return {
            "reply": """
✅ ATS Resume Improvement Tips:

1. Add more technical skills
2. Add real projects
3. Use proper resume format
4. Add internships/certifications
5. Include GitHub & LinkedIn links
6. Use job-related keywords

These tips improve ATS score significantly 🚀
"""
        }

    # =========================================
    # IMPROVEMENT QUESTIONS
    # =========================================
    elif "improve" in msg:

        return {
            "reply": f"""
✅ Ways To Improve:

1. Learn:
{', '.join(missing_skills) if missing_skills else 'Advanced technologies'}

2. Build real-world projects

3. Add certifications

4. Practice coding regularly

5. Improve resume keywords

Current Match Score: {score}%
"""
        }

    # =========================================
    # CERTIFICATION QUESTIONS
    # =========================================
    elif "certificate" in msg or "course" in msg:

        return {
            "reply": """
✅ Recommended Certifications:

1. Python for Everybody
2. Java Programming
3. SQL Certification
4. AWS Cloud Practitioner
5. Google Data Analytics
6. Full Stack Development

Certificates improve resume strength 🚀
"""
        }

    # =========================================
    # DEFAULT RESPONSE
    # =========================================
    else:

        return {
            "reply": """
🤖 Ask me things like:

• What projects should I build?
• How can I improve my resume?
• What skills are missing?
• Give ATS tips
• Recommend certifications
• How can I improve my score?

I'm your HireSmart AI Assistant 🚀
"""
        }