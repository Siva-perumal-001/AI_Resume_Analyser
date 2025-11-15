import React from "react";

const ATS = ({ score, suggestions }) => {

  const gradientClass =
    score > 69
      ? "from-green-100"
      : score > 49
      ? "from-yellow-100"
      : "from-red-100";

  const iconSrc =
    score > 69
      ? "/icons/ats-good.svg"
      : score > 49
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg"; // FIXED PATH

  const subtitle =
    score > 69 ? "Great Job!" : score > 49 ? "Good Start" : "Needs Improvement";

  return (
    <div className={`bg-linear-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-5 sm:p-6`}>

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-5 max-sm:gap-3">
        <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10 sm:w-12 sm:h-12" />

        <h2 className="text-xl sm:text-2xl font-bold">
          ATS Score – {score}/100
        </h2>
      </div>

      {/* SUBTITLE + DESCRIPTION */}
      <div className="mb-5">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{subtitle}</h3>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          This score represents how well your resume performs in modern
          Applicant Tracking Systems used by recruiters.
        </p>
      </div>

      {/* SUGGESTIONS */}
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-white/50 rounded-xl p-3"
          >
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="icon"
              className="w-5 h-5 mt-1 shrink-0"
            />

            <p
              className={`text-sm sm:text-base leading-snug ${
                suggestion.type === "good"
                  ? "text-green-700"
                  : "text-yellow-700"
              }`}
            >
              {suggestion.tip}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER LINE */}
      <p className="text-gray-700 italic mt-5 text-sm sm:text-base">
        Keep refining your resume to improve your chances of passing ATS filters.
      </p>
    </div>
  );
};

export default ATS;
