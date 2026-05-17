import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  analyzeResume,
  chatWithBot,
} from "../services/api";

export default function Applicant() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 💬 CHAT
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  // =========================================
  // 🔥 ANALYZE RESUME
  // =========================================
  const handleSubmit = async () => {

    if (!file || !jd) {

      alert("Please upload resume and enter job description");
      return;

    }

    try {

      setLoading(true);

      const data = await analyzeResume(file, jd);

      console.log("🔥 Resume Analysis Response:", data);

      setResult(data);

      // 🤖 AUTO BOT MESSAGE
      setChat([
        {
          sender: "bot",
          text: "Analysis completed! Ask me anything about your resume 🚀",
        },
      ]);

    } catch (error) {

      console.error(error);

      alert("Something went wrong ❌");

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // 🤖 REAL GEMINI AI CHATBOT
  // =========================================
  const handleSend = async () => {

    if (!input || !result) return;

    const userMessage = input;

    // USER MESSAGE
    const userMsg = {
      sender: "user",
      text: userMessage,
    };

    setChat((prev) => [...prev, userMsg]);

    setInput("");

    try {

      // THINKING MESSAGE
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thinking... 🤖",
        },
      ]);

      // API CALL
      const response = await chatWithBot(
        userMessage,
        result
      );

      // REMOVE THINKING
      setChat((prev) => prev.slice(0, -1));

      // REAL AI RESPONSE
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.reply,
        },
      ]);

    } catch (error) {

      console.error(error);

      // REMOVE THINKING
      setChat((prev) => prev.slice(0, -1));

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "AI Assistant failed ❌",
        },
      ]);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

      {/* ========================================= */}
      {/* HERO SECTION */}
      {/* ========================================= */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-10 rounded-b-[30px] shadow-lg">

        <div className="max-w-5xl mx-auto px-5 text-center">

          <h1 className="text-3xl md:text-4xl font-bold">
            🚀 HireSmart AI
          </h1>

          <p className="mt-3 text-base opacity-90">
            Analyze your resume and discover the best opportunities
          </p>

        </div>

      </div>

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}
      <div className="max-w-5xl mx-auto px-5 py-8">

        <div className="grid md:grid-cols-2 gap-6">

          {/* ========================================= */}
          {/* LEFT SIDE */}
          {/* ========================================= */}
          <div className="space-y-6">

            {/* ========================================= */}
            {/* UPLOAD RESUME */}
            {/* ========================================= */}
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                📄 Upload Resume
              </h2>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />

              {file && (

                <div className="mt-4 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium">

                  Selected File: {file.name}

                </div>

              )}

            </div>

            {/* ========================================= */}
            {/* JOB DESCRIPTION */}
            {/* ========================================= */}
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                💼 Job Description
              </h2>

              <textarea
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                rows="4"
                placeholder="Example: Looking for Python, Java, SQL developer..."
                onChange={(e) => setJd(e.target.value)}
              />

              {/* ANALYZE BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-5 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:scale-[1.02] transition-all duration-300"
              >
                {loading
                  ? "Analyzing Resume..."
                  : "Analyze Resume 🚀"}
              </button>

              {/* VIEW JOBS BUTTON */}
              {result?.recommended_jobs?.length > 0 && (

                <button
                  onClick={() =>
                    navigate("/recommended-jobs", {
                      state: {
                        jobs: result.recommended_jobs,
                      },
                    })
                  }
                  className="mt-4 w-full bg-black text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300"
                >
                  🔥 View Recommended Jobs
                </button>

              )}

            </div>

          </div>

          {/* ========================================= */}
          {/* RIGHT SIDE */}
          {/* ========================================= */}
          <div>

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              📊 Analysis Result
            </h2>

            {!result && (

              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 text-center text-gray-400">

                <p className="text-base">
                  No analysis yet 🚀
                </p>

              </div>

            )}

            {result && (

              <>

                {/* ========================================= */}
                {/* RESULT CARD */}
                {/* ========================================= */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 space-y-6">

                  {/* SCORE */}
                  <div>

                    <div className="flex justify-between items-center mb-3">

                      <h3 className="text-lg font-bold text-gray-800">
                        Match Score
                      </h3>

                      <span className="text-xl font-bold text-blue-600">
                        {result.match_score_percent}%
                      </span>

                    </div>

                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${
                          result.classification === "Suitable"
                            ? "bg-green-500"
                            : result.classification === "Moderate"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${result.match_score_percent}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* STATUS */}
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">

                    <div>

                      <p className="text-gray-500 text-sm">
                        Application Status
                      </p>

                      <p
                        className={`text-lg font-bold ${
                          result.classification === "Suitable"
                            ? "text-green-600"
                            : result.classification === "Moderate"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {result.classification}
                      </p>

                    </div>

                    <div className="text-3xl">
                      {result.match_score_percent >= 70
                        ? "💪"
                        : result.match_score_percent >= 40
                        ? "⚡"
                        : "❌"}
                    </div>

                  </div>

                  {/* MATCHED SKILLS */}
                  <div>

                    <h3 className="text-lg font-bold mb-3 text-gray-800">
                      ✅ Matched Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {result.matched_skills.map((skill, index) => (

                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                  </div>

                  {/* MISSING SKILLS */}
                  <div>

                    <h3 className="text-lg font-bold mb-3 text-gray-800">
                      ❌ Missing Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {result.missing_skills.length > 0 ? (

                        result.missing_skills.map((skill, index) => (

                          <span
                            key={index}
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>

                        ))

                      ) : (

                        <p className="text-gray-500">
                          No missing skills 🎉
                        </p>

                      )}

                    </div>

                  </div>

                  {/* SUGGESTIONS */}
                  <div>

                    <h3 className="text-lg font-bold mb-3 text-gray-800">
                      💡 Suggestions
                    </h3>

                    <ul className="space-y-3">

                      {result.suggestions?.map((suggestion, index) => (

                        <li
                          key={index}
                          className="bg-blue-50 text-blue-700 p-3 rounded-2xl text-sm"
                        >
                          {suggestion}
                        </li>

                      ))}

                    </ul>

                  </div>

                </div>

                {/* ========================================= */}
                {/* AI CHATBOT */}
                {/* ========================================= */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 mt-6">

                  <h2 className="text-xl font-bold text-gray-800 mb-5">
                    💬 AI Assistant
                  </h2>

                  {/* CHAT AREA */}
                  <div className="h-56 overflow-y-auto bg-gray-50 border rounded-2xl p-4 space-y-4">

                    {chat.map((msg, index) => (

                      <div
                        key={index}
                        className={`flex ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                            msg.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>

                      </div>

                    ))}

                  </div>

                  {/* INPUT */}
                  <div className="flex gap-3 mt-4">

                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about your resume..."
                      className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <button
                      onClick={handleSend}
                      className="bg-blue-600 text-white px-6 rounded-2xl font-semibold hover:bg-blue-700 transition"
                    >
                      Send
                    </button>

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}