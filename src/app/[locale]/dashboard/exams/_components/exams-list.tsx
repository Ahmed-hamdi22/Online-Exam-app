'use client';

import { getAllExam } from '@/lib/actions/exam/exams.action';
import { Exam } from '@/lib/types/exams';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import Link from 'next/link';

export default function ExamList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['exams'],
    queryFn: getAllExam,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (isError) {
    return <p className="text-red-500">{(error as Error).message}</p>;
  }

  if (!data?.exams || data.exams.length === 0) {
    return <p>No exams available.</p>;
  }

  return (
    <ul className="flex flex-col gap-4 p-6">
      {data.exams.map((exam: Exam) => (
        <li
          key={exam._id}
          className="h-20 bg-[#EFF6FF] p-4 flex justify-between items-center shadow-sm"
        >
          <Link
            href={`/dashboard/exam/${exam._id}`}
            className="flex justify-between items-center w-full"
          >
            <div className="flex flex-col gap-2">
              <h2 className="geist-mono-semibold text-primary">{exam.title}</h2>
              <p className="geist-mono-regular text-[14px] text-gray-500">
                {exam.numberOfQuestions} Questions
              </p>
            </div>

            <p className="geist-mono-regular text-[14px] text-[#1F2937]">
              Duration: {exam.duration} mins
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
