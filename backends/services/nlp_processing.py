import re

# simple skill list (you can expand later)
SKILLS_DB = [
    "python", "java", "c++", "sql", "mysql", "postgresql",
    "machine learning", "deep learning", "data science",
    "flask", "django", "fastapi", "react", "html", "css",
    "javascript", "aws", "docker", "git", "testing"
]


def preprocess_text(text: str):
    # convert to lowercase
    text = text.lower()

    # remove special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)

    # remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()

    return text


def extract_skills(text: str):
    text_lower = text.lower()
    found_skills = []

    for skill in SKILLS_DB:
        if skill in text_lower:
            found_skills.append(skill)

    return list(set(found_skills))