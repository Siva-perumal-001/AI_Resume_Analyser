import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="w-full px-4 py-3 border-t border-gray-100">
      <div className="flex flex-row items-center justify-between max-sm:flex-col max-sm:gap-1">
        <div className="flex items-center gap-2">
          <p className="text-xl max-sm:text-lg">{title}</p>
          <ScoreBadge score={score} />
        </div>

        <p className="text-xl max-sm:text-lg font-semibold">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden">
      {/* SCORE HEADER */}
      <div className="flex flex-row items-center p-4 gap-6 max-sm:flex-col max-sm:text-center">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2 max-sm:items-center">
          <h2 className="text-2xl max-sm:text-xl font-bold">
            Your Resume Score
          </h2>
          <p className="text-sm text-gray-500 max-sm:text-xs">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      {/* CATEGORIES */}
      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
