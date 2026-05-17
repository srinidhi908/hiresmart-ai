import { useState } from "react";
import { analyzeMultipleResumes, downloadReport } from "../services/api";

export default function Recruiter() {
  const [files, setFiles] = useState([]);
  const [jd, setJd] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (files.length === 0 || !jd) {
      alert("Upload resumes and enter job description");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeMultipleResumes(files, jd);
      setResults(data);
    } catch {
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getMedal = (i) =>
    i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🏅";

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          🧑‍💼 HireSmart – Recruiter Mode
        </h1>
        <p className="text-center mt-2 text-sm opacity-90">
          Find the best candidate instantly
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="p-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-5 md:col-span-1">

          {/* Upload */}
          <div className="bg-white p-5 rounded-xl shadow-md min-h-[160px] flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold mb-3">Upload Resumes</p>

              <input
                type="file"
                multiple
                className="text-sm"
                onChange={(e) => setFiles([...e.target.files])}
              />
            </div>

            <div className="text-xs text-gray-500 mt-3 space-y-1">
              {files.map((f, i) => (
                <p key={i}>{f.name}</p>
              ))}
            </div>
          </div>

          {/* JD */}
          <div className="bg-white p-5 rounded-xl shadow-md min-h-[220px] flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold mb-3">Job Description</p>

              <textarea
                className="w-full p-2 text-sm border rounded mb-3 resize-none"
                rows="4"
                placeholder="e.g. python, java, sql..."
                onChange={(e) => setJd(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full text-sm bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-md hover:scale-[1.02] transition"
            >
              {loading ? "Analyzing..." : "Analyze Candidates 🚀"}
            </button>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2">
          
          {/* 🔥 HEADER + DOWNLOAD BUTTON */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Analysis Results</h2>

            {results.length > 0 && (
              <button
                onClick={() => downloadReport(results)}
                className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Download Report 📄
              </button>
            )}
          </div>

          <div className="border border-dashed rounded-xl p-6 bg-gray-50">

            {results.length === 0 && (
              <p className="text-gray-400 text-center text-sm">
                No results yet
              </p>
            )}

            {results.map((res, i) => (
              <div
                key={i}
                className={`mb-5 p-5 rounded-xl shadow-md transition transform hover:scale-[1.01] ${
                  i === 0
                    ? "border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-lg"
                    : "bg-white"
                }`}
              >
                {/* TOP BADGE */}
                {i === 0 && (
                  <div className="mb-2 text-xs font-semibold text-yellow-700">
                    ⭐ Top Candidate
                  </div>
                )}

                <h3 className="font-semibold text-base">
                  {getMedal(i)} Rank {i + 1} – {res.name}
                </h3>

                <p className="text-sm mt-2">
                  <b>Score:</b> {res.match_score}%
                </p>

                {/* Progress */}
                <div className="w-full bg-gray-200 h-2 rounded mt-2 mb-3">
                  <div
                    className={`h-2 rounded ${
                      i === 0 ? "bg-yellow-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${res.match_score}%` }}
                  ></div>
                </div>

                {/* Status */}
                <p className="text-sm mb-2">
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold ${
                      res.classification === "Suitable"
                        ? "text-green-600"
                        : res.classification === "Moderate"
                        ? "text-yellow-500"
                        : "text-red-600"
                    }`}
                  >
                    {res.classification}
                  </span>
                </p>

                {/* Skills */}
                <p className="text-sm">
                  <b>Matched:</b> {res.matched_skills?.join(", ") || "None"}
                </p>

                <p className="text-sm">
                  <b>Missing:</b> {res.missing_skills?.join(", ") || "None"}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}