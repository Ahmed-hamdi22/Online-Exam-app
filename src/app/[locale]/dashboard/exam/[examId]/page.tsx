'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';
import QuizApp from '../../component';
import { useQuery } from '@tanstack/react-query';
import { getExamById } from '@/lib/actions/exam/exams.action';

export default function GetExams() {
  const { examId } = useParams<{ examId: string }>();
  const [search, setSearch] = useState('');
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  // React Query hook
  const {
    data: exams = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['exam', examId],
    queryFn: () => getExamById(examId!),
    enabled: !!examId, // only fetch if examId exists
  });

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-4">
        Error: {(error as Error).message}
      </p>
    );
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
