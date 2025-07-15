"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppError from "@/lib/utils/app-error";
import { Loader } from "lucide-react";
import Statistics from "@/components/common/statistics";

export default function GetQuizForm() {
  // State
  const [subjects, setSubjects] = useState<
    Array<{ _id: string; name: string; icon: string }>
  >([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // useEffect
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetch("http://localhost:3000/api/subjects");
        const payload = await response.json();

        if (!response.ok) {
          throw new AppError(
            payload.message || "Failed to fetch subjects",
            response.status
          );
        }

        if (!payload.subjects || !Array.isArray(payload.subjects)) {
          setError("No subjects found or invalid data.");
          return;
        }

        setSubjects(payload.subjects);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  const filteredQuizes = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <Statistics />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
        <input
          type="text"
          className="border rounded-full md:w-4/6 w-full px-4 py-2 shadow"
          placeholder="Search Quiz"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button className="bg-[#5573ea]  text-white px-4 py-2 rounded-full ">
            Start Quiz
          </button>
          <img
            className="w-10 h-10 rounded-full hidden md:visible"
            src="images/img.png"
            alt="User"
          />
        </div>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h5 className="text-primary text-lg font-semibold mb-4">Quizes</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredQuizes.length === 0 ? (
            <p className="text-gray-500">No quizzes found</p>
          ) : (
            filteredQuizes.map((subject: any) => (
              <div key={subject._id} className="relative group">
                <Link href={`/dashboard/exam/${subject._id}`}>
                  <img
                    src={subject.icon}
                    alt={subject.name}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#5573ea]   w-3/4 bg-opacity-80 text-white px-3 py-1 rounded text-center">
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
