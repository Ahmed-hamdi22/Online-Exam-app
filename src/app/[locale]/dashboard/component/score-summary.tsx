import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  correct: number;
  incorrect: number;
  total: number;
  onShowResults: () => void;
  onRetry: () => void;
}

export default function ScoreCard({
  correct,
  incorrect,
  total,
  onShowResults,
  onRetry,
}: Props) {
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
      <h2 className="text-lg font-medium mb-4">Your Score</h2>
      <div className="mx-auto w-32 h-32 mb-4">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#000",
            pathColor: "#2563EB",
            trailColor: "#F87171",
          })}
        />
      </div>

      <div className="flex justify-around mb-4">
        <div className="text-blue-500 font-medium">
          Correct
          <p className="text-xl font-bold">{correct}</p>
        </div>
        <div className="text-red-500 font-medium">
          Incorrect
          <p className="text-xl font-bold">{incorrect}</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onRetry}
          className="border border-primary text-primary px-4 py-2 rounded-full"
        >
          Back
        </button>
        <button
          onClick={onShowResults}
          className="bg-primary text-white px-4 py-2 rounded-full"
        >
          Show Results
        </button>
      </div>
    </div>
  );
}
