from fastapi import APIRouter, UploadFile, File
import shutil
import os

from services.text_extraction import extract_text_from_pdf, extract_text_from_docx
from services.nlp_processing import preprocess_text, extract_skills

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def save_file(upload_file: UploadFile):
    file_path = os.path.join(UPLOAD_FOLDER, upload_file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    return file_path


def extract_text(file_path: str):
    ext = file_path.lower()

    if ext.endswith(".pdf"):
        return extract_text_from_pdf(file_path)

    elif ext.endswith(".docx"):
        return extract_text_from_docx(file_path)

    else:
        raise ValueError("Unsupported file type")


# ==============================
# Upload Resume Route
# ==============================
@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    file_path = save_file(file)

    text = extract_text(file_path)

    clean_text = preprocess_text(text)
    skills = extract_skills(clean_text)

    return {
        "filename": file.filename,
        "text_preview": text[:300],
        "skills_detected": skills
    }
