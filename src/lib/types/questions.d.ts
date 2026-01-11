interface Answer {
  key: string;
  answer: string;
}

interface Subject {
  _id: string;
  name: string;
}

interface Exam {
  _id: string;
  title: string;
}

interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  type: string;
  correct: string;
  subject: Subject;
  exam: Exam;
}
