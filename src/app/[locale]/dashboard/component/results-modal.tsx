// ResultsPopup.tsx
interface ResultsPopupProps {
  incorrectQuestions: any[];
  selectedAnswers: { [key: number]: string };
  onClose: () => void;
}

export default function ResultsPopup({
  incorrectQuestions,
  selectedAnswers,
  onClose,
}: ResultsPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-4xl bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Incorrect Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incorrectQuestions.map((question, index) => {
            const userAnswer = selectedAnswers[question.index];
            return (
              <div key={index} className="border rounded p-4 shadow-sm">
                <h5 className="mb-2 font-medium">{question.question}</h5>
                {question.answers.map((answer: any) => {
                  const isUserAnswer = userAnswer === answer.key;
                  const isCorrectAnswer = question.correct === answer.key;
                  return (
                    <div
                      key={answer.key}
                      className={`p-2 rounded mb-2 ${isCorrectAnswer ? "bg-green-100 border border-green-500 text-green-700" : isUserAnswer ? "bg-red-100 border border-red-500 text-red-700" : "bg-gray-100"}`}
                    >
                      <input
                        type="radio"
                        checked={isUserAnswer}
                        readOnly
                        className="mr-2"
                      />
                      {answer.answer}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-primary text-white px-6 py-2 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ProgressDots.tsx
interface ProgressDotsProps {
  questionsLength: number;
  currentIndex: number;
  selectedAnswers: { [key: number]: string };
}

export function ProgressDots({
  questionsLength,
  currentIndex,
  selectedAnswers,
}: ProgressDotsProps) {
  return (
    <div className="flex justify-center items-center gap-2 mb-4">
      {Array.from({ length: questionsLength }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${index < currentIndex ? "bg-blue-500" : index === currentIndex && selectedAnswers[currentIndex] ? "bg-blue-500" : "bg-gray-300"}`}
        ></div>
      ))}
    </div>
  );
}
