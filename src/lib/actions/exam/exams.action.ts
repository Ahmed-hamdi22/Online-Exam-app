export async function getAllExam() {
  const res = await fetch('/api/allexams');
  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || 'Failed to fetch exams');
  }

  return payload;
}

export async function getExamById(examId: string) {
  const res = await fetch(`/api/exams/${examId}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch exam');
  }
  const data = await res.json();
  return data.exam ? [data.exam] : [];
}

// fetch questions by quizeI
export const fetchQuestions = async (quizeId: string): Promise<Question[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions?exam=${quizeId}`
  );
  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || 'Failed to fetch questions');
  }

  if (!payload.questions || !Array.isArray(payload.questions)) {
    throw new Error('Invalid questions data');
  }

  return payload.questions;
};

//
export async function fetchSubjects(): Promise<subjects[]> {
  const res = await fetch('/api/subjects');
  const payload: APIResponse<{ subjects: subjects[] }> = await res.json();

  if (!res.ok || !('subjects' in payload)) {
    throw new Error(payload.message || 'Failed to fetch subjects');
  }

  return payload.subjects;
}
