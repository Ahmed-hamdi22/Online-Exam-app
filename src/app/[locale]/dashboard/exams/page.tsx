import { Suspense } from 'react';
import type { Metadata } from 'next';
import ExamList from './_components/exams-list';

export const metadata: Metadata = {
  title: 'Exams',
  description: 'View and access the list of available exams for your subjects.',
  keywords: ['exams', 'subjects', 'education', 'assessment'],
  openGraph: {
    title: 'Exams',
    description:
      'View and access the list of available exams for your subjects.',
    type: 'website',
    url: 'http://localhost:3000//exams',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630.png?text=Exams',
        width: 1200,
        height: 630,
        alt: 'Exams',
      },
    ],
  },
};

export default async function Page() {
  return (
    <Suspense>
      <ExamList />
    </Suspense>
  );
}
