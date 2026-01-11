'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSubjects } from '@/lib/actions/exam/exams.action';

export default function GetQuizForm() {
  //State
  const [search, setSearch] = useState('');

  // Fetch subjects using react-query
  const {
    data: subjects = [],
    isLoading,
    isError,
    error,
  } = useQuery<subjects[], Error>({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  });

  const filteredQuizes = subjects.filter((subject: subjects) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
        <input
          type="text"
          className="border rounded-full md:w-4/6 w-full px-4 py-2 shadow"
          placeholder="Search Quiz"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-[#5573ea] text-white px-4 py-2 rounded-full">
          Start Quiz
        </button>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h5 className="text-primary text-lg font-semibold mb-4">Quizzes</h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredQuizes.length === 0 ? (
            <p className="text-gray-500">No quizzes found</p>
          ) : (
            filteredQuizes.map((subject: subjects) => (
              <div key={subject._id} className="relative group">
                <Link href={`/dashboard/exams`}>
                  <Image
                    src={subject.icon}
                    alt={subject.name}
                    width={400}
                    height={288}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#5573ea] w-3/4 bg-opacity-80 text-white px-3 py-1 rounded text-center">
                    <h6>{subject.name}</h6>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
