import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col items-center justify-center px-6">

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-indigo-700 mb-4">
        HireSmart
      </h1>

      <p className="text-gray-500 mb-12 text-lg">
        Dual Mode AI Resume Screening System
      </p>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">

        {/* APPLICANT CARD */}
        <div
          onClick={() => navigate("/applicant")}
          className="bg-white p-8 rounded-2xl shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="flex flex-col items-center text-center">

            {/* ICON */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5 text-2xl">
              👤
            </div>

            <h2 className="text-xl font-semibold mb-3">
              Applicant Mode
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              Upload your resume and the Job Description to instantly receive your match score and personalized AI-driven improvement tips.
            </p>

            <button className="px-6 py-2 border border-green-400 text-green-600 rounded-full transition duration-300 hover:bg-green-500 hover:text-white">
              Continue as Applicant →
            </button>

          </div>
        </div>

        {/* RECRUITER CARD */}
        <div
          onClick={() => navigate("/recruiter")}
          className="bg-white p-8 rounded-2xl shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="flex flex-col items-center text-center">

            {/* ICON */}
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-5 text-2xl">
              💼
            </div>

            <h2 className="text-xl font-semibold mb-3">
              Recruiter Mode
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              Upload multiple applicant resumes against a job description to instantly rank and evaluate your top candidates.
            </p>

            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full transition duration-300 hover:bg-black hover:text-white">
              Continue as Recruiter →
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}