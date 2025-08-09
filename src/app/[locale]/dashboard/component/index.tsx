"use client";

import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AppError from "@/lib/utils/app-error";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

interface QuizAppProps {
  quizeId: string;
}

export default function QuizApp({ quizeId }: QuizAppProps) {
  const t = useTranslations();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [key: number]: boolean;
  }>({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [time, setTime] = useState(900);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const incorrectQuestions = questions.filter(
    (q, index) =>
      selectedAnswers[index] !== q.correct && answeredQuestions[index]
  );

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions?exam=${quizeId}`
        );
        const payload = await response.json();

        if (!response.ok)
          throw new AppError(
            payload.message || "Failed to fetch questions",
            response.status
          );

        if (!payload.questions || !Array.isArray(payload.questions))
          return setError(true);

        setQuestions(payload.questions);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizeId]);

  useEffect(() => {
    if (time === 0) setQuizCompleted(true);
    const timer = setInterval(
      () => setTime((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, [time]);

  const handleAnswerSelect = (key: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: key }));
  };

  const handleNextQuestion = () => {
    if (
      !answeredQuestions[currentQuestionIndex] &&
      selectedAnswers[currentQuestionIndex]
    ) {
      const isCorrect =
        selectedAnswers[currentQuestionIndex] === currentQuestion.correct;
      setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));
      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestionIndex]: true,
      }));
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const renderLoader = () => (
    <div className="flex justify-center items-center h-screen">
      <Loader className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const renderError = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
        <h4 className="text-lg font-medium">{t("no-questions")}</h4>
      </div>
    </div>
  );

  const renderResultsPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {t("incorrect-questions")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incorrectQuestions.map((question, index) => {
            const userAnswer = selectedAnswers[questions.indexOf(question)];
            return (
              <div key={index} className="border rounded p-4 shadow-sm">
                <h5 className="mb-2 font-medium">{question.question}</h5>
                {question.answers.map((answer: any) => {
                  const isUserAnswer = userAnswer === answer.key;
                  const isCorrectAnswer = question.correct === answer.key;
                  return (
                    <div
                      key={answer.key}
                      className={`p-2 rounded mb-2 ${
                        isCorrectAnswer
                          ? "bg-green-100 border border-green-500 text-green-700"
                          : isUserAnswer
                            ? "bg-red-100 border border-red-500 text-red-700"
                            : "bg-gray-100"
                      }`}
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
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const renderScoreScreen = () => {
    const percentage = Math.round((score.correct / questions.length) * 100);
    return (
      <div className="flex justify-center items-center">
        <div className="rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <h2 className="text-lg font-medium mb-4">{t("your-score")}</h2>
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
            <ScoreBox label="Correct" value={score.correct} color="blue" />
            <ScoreBox label="Incorrect" value={score.incorrect} color="red" />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="border border-primary text-primary px-4 py-2 rounded-full"
            >
              Back
            </button>
            <button
              onClick={() => setShowResults(true)}
              className={`px-4 py-2 rounded-full text-white ${
                score.correct === 0 && score.incorrect === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary"
              }`}
              disabled={score.correct === 0 && score.incorrect === 0}
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuestionScreen = () => (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-blue-500">
            {t(" Question ")}
            {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span
            className={`text-sm font-medium ${time <= 60 ? "text-red-600" : "text-green-600"}`}
          >
            <i className="fa-regular fa-clock mr-1"></i>
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
        </div>

        <ProgressDots
          questions={questions}
          currentIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
        />

        <h2 className="text-lg font-semibold mb-4">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.answers.map((answer: any) => (
            <label
              key={answer.key}
              className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                selectedAnswers[currentQuestionIndex] === answer.key
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="option"
                value={answer.key}
                className="form-radio text-blue-600"
                onChange={() => handleAnswerSelect(answer.key)}
                checked={selectedAnswers[currentQuestionIndex] === answer.key}
              />
              <span className="ml-3">{answer.answer}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full disabled:opacity-50"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          >
            Back
          </button>
          <button
            className={`px-4 py-2 rounded-full text-white ${
              selectedAnswers[currentQuestionIndex]
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={handleNextQuestion}
            disabled={!selectedAnswers[currentQuestionIndex]}
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return renderLoader();
  if (questions.length === 0 || error) return renderError();
  if (quizCompleted && showResults) return renderResultsPopup();
  if (quizCompleted) return renderScoreScreen();
  return renderQuestionScreen();
}

const ScoreBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div>
    <p className={`text-${color}-500 font-medium`}>{label}</p>
    <p className={`text-xl font-bold text-${color}-500`}>{value}</p>
  </div>
);

const ProgressDots = ({
  questions,
  currentIndex,
  selectedAnswers,
}: {
  questions: any[];
  currentIndex: number;
  selectedAnswers: { [key: number]: string };
}) => (
  <div className="flex justify-center items-center gap-2 mb-4">
    {questions.map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full ${
          index < currentIndex
            ? "bg-blue-500"
            : index === currentIndex && selectedAnswers[currentIndex]
              ? "bg-blue-500"
              : "bg-gray-300"
        }`}
      ></div>
    ))}
  </div>
);
