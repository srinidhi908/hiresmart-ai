import { useLocation, useNavigate } from "react-router-dom";

export default function RecommendedJobs() {

  const location = useLocation();
  const navigate = useNavigate();

  const jobs = location.state?.jobs || [];

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            💼 Recommended Jobs
          </h1>

          <button
            onClick={() => navigate("/applicant")}
            className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Back
          </button>

        </div>

        {/* JOBS */}
        <div className="space-y-6">

          {jobs.map((job, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold text-blue-700">
                    {job.title}
                  </h2>

                  <p className="text-lg font-semibold text-gray-700 mt-2">
                    {job.company}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    📍 {job.location}
                  </p>

                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Recommended
                </span>

              </div>

              <p className="text-gray-600 mt-5 leading-relaxed">
                {job.description}
              </p>

              <a
                href={job.apply_link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                Apply Now 🚀
              </a>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}