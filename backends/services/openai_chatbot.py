from openai import OpenAI
import os
from dotenv import load_dotenv

# LOAD ENV
load_dotenv()

# API KEY
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# ======================================
# AI CHAT FUNCTION
# ======================================
def ask_openai(question, result):

    prompt = f"""
    You are HireSmart AI, an intelligent AI career assistant.

    Resume Analysis:

    Candidate Name:
    {result.get("candidate_name", "Not Available")}

    Match Score:
    {result.get("match_score_percent", "Not Available")}

    Classification:
    {result.get("classification", "Not Available")}

    Matched Skills:
    {", ".join(result.get("matched_skills", []))}

    Missing Skills:
    {", ".join(result.get("missing_skills", []))}

    Suggestions:
    {", ".join(result.get("suggestions", []))}

    User Question:
    {question}

    Give:
    - ATS improvement tips
    - Resume suggestions
    - Career guidance
    - Project recommendations
    - Professional answers
    """

    try:

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",

            messages=[
                {
                    "role": "system",
                    "content": "You are a professional AI career assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.7
        )

        return response.choices[0].message.content

    except Exception as e:

        print("OpenAI Error:", e)

        return f"AI Error: {str(e)}"