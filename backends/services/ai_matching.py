# services/ai_matching.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_match_score(resume_text: str, jd_text: str):
    """
    Fully LOCAL matching
    No OpenAI
    No API cost
    Uses TF-IDF + Cosine similarity
    """

    documents = [resume_text, jd_text]

    vectorizer = TfidfVectorizer(stop_words="english")

    tfidf_matrix = vectorizer.fit_transform(documents)

    score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

    percent = round(float(score) * 100, 2)

    # classification
    if percent >= 75:
        label = "Highly Suitable"
    elif percent >= 50:
        label = "Moderately Suitable"
    else:
        label = "Not Suitable"

    return percent, label
