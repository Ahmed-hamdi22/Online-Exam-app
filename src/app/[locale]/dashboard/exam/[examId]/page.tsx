"use client";

import { useEffect, useState } from "react";
import AppError from "@/lib/utils/app-error";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import QuizApp from "../../component";

export default function GetExams() {
  const [exams, setExams] = useState<
    Array<{
      _id: string;
      title: string;
      numberOfQuestions: number;
      duration: number;
    }>
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const { examId } = useParams<{ examId: string }>();

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/exams?subject=${examId}`
        );
        const payload = await response.json();

        if (!response.ok) {
          throw new AppError(
            payload.message || "Failed to fetch exams",
            response.status
          );
        }

        if (!payload.exams || !Array.isArray(payload.exams)) {
          setError("No exams found or invalid data.");
          return;
        }

        setExams(payload.exams);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, [examId]);

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  const openPopup = (examId: string) => {
    setSelectedExamId(examId);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedExamId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          className="border rounded-full w-4/6 px-4 py-2 shadow"
          placeholder="Search Exam"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          className="w-10 h-10 md:visible hidden rounded-full"
          src="/images/img.png"
          alt="User"
        />
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h5 className="text-blue-600 text-lg font-semibold mb-4">Exams</h5>
        <div className="space-y-4">
          {filteredExams.length === 0 ? (
            <p className="text-gray-500">No exams found</p>
          ) : (
            filteredExams.map((exam: any) => (
              <div
                key={exam._id}
                className="flex justify-between items-center p-4 border rounded-lg shadow"
              >
                <div>
                  <h6 className="font-semibold">{exam.title}</h6>
                  <p className="text-gray-600">
                    {exam.numberOfQuestions} Questions
                  </p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-gray-700">{exam.duration} Minutes</p>
                  <button
                    className="bg-blue-600 text-white px-6 py-1 rounded-full"
                    onClick={() => openPopup(exam._id)}
                  >
                    Start
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {popupVisible && selectedExamId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={closePopup}
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <QuizApp quizeId={selectedExamId} />
          </div>
        </div>
      )}
    </div>
  );
}
