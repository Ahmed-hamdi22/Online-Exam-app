"use client";

import { useEffect, useState } from "react";
import AppError from "@/lib/utils/app-error";
import { Loader } from "lucide-react";
import ScoreSummary from "./score-summary";
import ResultsModal from "./results-modal";
import QuestionCard from "./question-card";

interface QuizAppProps {
  quizeId: string;
}

export default function QuizApp({ quizeId }: QuizAppProps) {
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

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/questions?exam=${quizeId}`
        );
        const payload = await response.json();

        if (!response.ok) {
          throw new AppError(
            payload.message || "Failed to fetch questions",
            response.status
          );
        }

        if (!payload.questions || !Array.isArray(payload.questions)) {
          setError(true);
          return;
        }

        setQuestions(payload.questions);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizeId]);

  useEffect(() => {
    if (time === 0) setQuizCompleted(true);

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleAnswerSelect = (key: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: key }));
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

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

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const incorrectQuestions = questions
    .map((q, index) => ({ ...q, index }))
    .filter(
      (q) =>
        selectedAnswers[q.index] !== q.correct && answeredQuestions[q.index]
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (questions.length === 0 || error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h4 className="text-lg font-medium">No questions available</h4>
        </div>
      </div>
    );
  }

  if (quizCompleted && showResults) {
    return (
      <ResultsModal
        incorrectQuestions={incorrectQuestions}
        selectedAnswers={selectedAnswers}
        onClose={() => window.location.reload()}
      />
    );
  }

  if (quizCompleted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScoreSummary
          score={score}
          total={questions.length}
          onBack={() => window.location.reload()}
          onShowResults={() => setShowResults(true)}
        />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-blue-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span
            className={`text-sm font-medium ${
              time <= 60 ? "text-red-600" : "text-green-600"
            }`}
          >
            <i className="fa-regular fa-clock mr-1"></i>
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
        </div>

        <div className="flex justify-center items-center gap-2 mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentQuestionIndex
                  ? "bg-blue-500"
                  : index === currentQuestionIndex &&
                      selectedAnswers[currentQuestionIndex]
                    ? "bg-blue-500"
                    : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        <QuestionCard
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          handleAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-between mt-6">
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full disabled:opacity-50"
            disabled={currentQuestionIndex === 0}
            onClick={handlePrevQuestion}
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
}
