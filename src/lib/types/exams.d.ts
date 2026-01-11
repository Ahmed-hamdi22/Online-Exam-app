export interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface ExamsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface ExamsResponse {
  message: string;
  metadata: ExamsMetadata;
  exams: Exam[];
}

type AnswerPayload = {
  answers: {
    questionId: string;
    correct: string;
  }[];
  time: number;
};
