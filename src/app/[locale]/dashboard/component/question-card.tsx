import { ProgressDots } from "./ProgressDots";

interface Props {
  question: any;
  currentIndex: number;
  questionsLength: number;
  selectedAnswer: string;
  time: number;
  onSelect: (key: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function QuestionCard({
  question,
  currentIndex,
  questionsLength,
  selectedAnswer,
  time,
  onSelect,
  onBack,
  onNext,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-blue-500">
          Question {currentIndex + 1} of {questionsLength}
        </span>
        <span
          className={`text-sm font-medium ${time <= 60 ? "text-red-600" : "text-green-600"}`}
        >
          <i className="fa-regular fa-clock mr-1"></i>
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </span>
      </div>

      {/* <ProgressDots
        questionsLength={questionsLength}
        currentIndex={currentIndex}
        selectedAnswers={{ [currentIndex]: selectedAnswer }}
      /> */}

      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>

      <div className="space-y-3">
        {question.answers.map((answer: any) => (
          <label
            key={answer.key}
            className={`flex items-center p-3 rounded-lg border cursor-pointer ${
              selectedAnswer === answer.key
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="option"
              value={answer.key}
              className="form-radio text-blue-600"
              onChange={() => onSelect(answer.key)}
              checked={selectedAnswer === answer.key}
            />
            <span className="ml-3">{answer.answer}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full disabled:opacity-50"
          disabled={currentIndex === 0}
          onClick={onBack}
        >
          Back
        </button>
        <button
          className={`px-4 py-2 rounded-full text-white ${selectedAnswer ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}`}
          onClick={onNext}
          disabled={!selectedAnswer}
        >
          {currentIndex === questionsLength - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
