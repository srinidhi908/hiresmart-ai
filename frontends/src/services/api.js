// =======================================
// 🔥 BASE CONFIG
// =======================================

// ✅ LOCAL BACKEND
const BASE_URL = "https://hiresmart-ai-np7k.onrender.com";

// ❌ OLD RENDER BACKEND
// const BASE_URL = "https://hiresmarts-backend.onrender.com";


// =======================================
// 🔧 Helper: fetch with timeout + better errors
// =======================================
const fetchWithTimeout = async (
  url,
  options = {},
  timeout = 40000
) => {

  const controller = new AbortController();

  const id = setTimeout(
    () => controller.abort(),
    timeout
  );

  try {

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;

  } catch (err) {

    if (err.name === "AbortError") {

      throw new Error(
        "Server is waking up ⏳ Please try again..."
      );
    }

    throw err;

  } finally {

    clearTimeout(id);
  }
};


// =======================================
// 🔧 Helper: Safe JSON parse
// =======================================
const parseJSON = async (response) => {

  try {

    return await response.json();

  } catch (err) {

    const text = await response.text();

    console.error("Invalid JSON:", text);

    throw new Error("Invalid response from server");
  }
};


// =======================================
// 🔹 Single Resume (Applicant Mode)
// =======================================
export const analyzeResume = async (
  file,
  jd
) => {

  const formData = new FormData();

  formData.append("resume_file", file);

  formData.append(
    "job_description",
    jd
  );

  const response = await fetchWithTimeout(
    `${BASE_URL}/match-resume`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await parseJSON(response);

  if (!response.ok) {

    console.error(
      "Backend Error:",
      data
    );

    throw new Error(
      data.detail ||
      data.message ||
      "Failed to analyze resume"
    );
  }

  // 🔥 DEBUG RESPONSE
  console.log(
    "✅ Resume Analysis Response:",
    data
  );

  // 🔥 DEBUG JOBS
  console.log(
    "💼 Recommended Jobs:",
    data.recommended_jobs
  );

  return data;
};


// =======================================
// 🔹 Multiple Resumes (Recruiter Mode)
// =======================================
export const analyzeMultipleResumes = async (
  files,
  jd
) => {

  const formData = new FormData();

  files.forEach((file) => {

    formData.append("files", file);
  });

  formData.append(
    "job_description",
    jd
  );

  const response = await fetchWithTimeout(
    `${BASE_URL}/match-multiple`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await parseJSON(response);

  if (!response.ok) {

    console.error(
      "Backend Error:",
      data
    );

    throw new Error(
      data.detail ||
      "Failed to analyze multiple resumes"
    );
  }

  return data;
};


// =======================================
// 🔥 DOWNLOAD PDF REPORT
// =======================================
export const downloadReport = async (
  results,
  companyName = "HireSmart AI"
) => {

  try {

    // 🔥 SEND COMPLETE DATA
    const formattedResults = results.map((r) => ({

      // 🔥 Resume File
      name: r.name,

      // 🔥 Candidate Details
      candidate_name:
        r.candidate_name || "Not Found",

      candidate_email:
        r.candidate_email || "Not Found",

      candidate_phone:
        r.candidate_phone || "Not Found",

      // 🔥 Analysis
      match_score: r.match_score,

      classification: r.classification,

      matched_skills:
        r.matched_skills || [],

      missing_skills:
        r.missing_skills || [],

    }));

    console.log(
      "📄 Sending PDF Data:",
      formattedResults
    );

    const response = await fetchWithTimeout(
      `${BASE_URL}/download-report`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          company_name: companyName,

          results: formattedResults,
        }),
      }
    );

    if (!response.ok) {

      throw new Error(
        "Failed to generate report"
      );
    }

    const blob = await response.blob();

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "HireSmart_Report.pdf";

    document.body.appendChild(a);

    a.click();

    a.remove();

  } catch (err) {

    console.error(err);

    alert(
      err.message ||
      "PDF download failed ❌"
    );
  }
};


// =======================================
// 💬 CHATBOT API
// =======================================
export const chatWithBot = async (
  message,
  results
) => {

  const response = await fetchWithTimeout(
    `${BASE_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
        results,
      }),
    }
  );

  const data = await parseJSON(response);

  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Chatbot failed"
    );
  }

  return data;
};