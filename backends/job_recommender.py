import requests
import urllib.parse

# ==========================================
# 🔥 ADZUNA API CONFIG
# ==========================================

APP_ID = "5f9ff334"
APP_KEY = "70777ff2e055fb1c3ef8be5422099b66"

BASE_URL = "https://api.adzuna.com/v1/api/jobs/in/search/1"


# ==========================================
# 🔥 GET RECOMMENDED JOBS
# ==========================================

def get_recommended_jobs(skills, location="Hyderabad"):

    jobs = []

    # Convert skills list into search query
    search_query = " ".join(skills)

    # Encode URL safely
    encoded_query = urllib.parse.quote(search_query)

    # ==========================================
    # 🔥 API URL
    # ==========================================

    url = (
        f"{BASE_URL}"
        f"?app_id={APP_ID}"
        f"&app_key={APP_KEY}"
        f"&results_per_page=5"
        f"&what={encoded_query}"
        f"&where={location}"
        f"&content-type=application/json"
    )

    try:

        response = requests.get(url)

        data = response.json()

        # ==========================================
        # 🔥 EXTRACT JOBS
        # ==========================================

        for job in data.get("results", []):

            jobs.append({
                "title": job.get("title", "No Title"),
                "company": job.get("company", {}).get("display_name", "Unknown Company"),
                "location": job.get("location", {}).get("display_name", location),
                "description": job.get("description", "No description available")[:200] + "...",
                "apply_link": job.get("redirect_url", "#")
            })

    except Exception as e:

        print("❌ Adzuna API Error:", e)

    return jobs