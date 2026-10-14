import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import subjectSnapshot from '../../../public/catalog/subjects.json';
import examSnapshot from '../../../public/catalog/exams.json';

export type PublicSubject = {
  _id: string;
  name: string;
  icon: string;
};

export type PublicExam = {
  _id: string;
  title: string;
  duration: number;
  numberOfQuestions: number;
  subject: string;
};

type Catalog = {
  subjects: PublicSubject[];
  exams: PublicExam[];
};

const catalogDirectory = join(process.cwd(), 'public', 'catalog');

function catalogPath(section: keyof Catalog) {
  return join(catalogDirectory, `${section}.json`);
}

export async function readPublicCatalog<K extends keyof Catalog>(
  section: K
): Promise<Catalog[K] | null> {
  if (process.env.NODE_ENV !== 'development') {
    const entries = section === 'subjects' ? subjectSnapshot : examSnapshot;
    return entries.length ? (entries as Catalog[K]) : null;
  }

  try {
    const contents = await readFile(catalogPath(section), 'utf8');
    const entries: unknown = JSON.parse(contents);
    return Array.isArray(entries) && entries.length
      ? (entries as Catalog[K])
      : null;
  } catch {
    return null;
  }
}

export async function savePublicCatalog<K extends keyof Catalog>(
  section: K,
  entries: Catalog[K]
) {
  // The checked-in snapshot serves production. Refresh it while running locally.
  if (process.env.NODE_ENV !== 'development') return;
  try {
    await mkdir(catalogDirectory, { recursive: true });
    await writeFile(catalogPath(section), JSON.stringify(entries, null, 2) + '\n');
  } catch (error) {
    // A failed snapshot update must not block an authenticated visitor.
    console.error(`Unable to refresh public ${section} catalog`, error);
  }
}

export function toPublicSubjects(value: unknown): PublicSubject[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry: unknown) => {
    if (!entry || typeof entry !== 'object') return [];
    const subject = entry as Record<string, unknown>;
    if (typeof subject._id !== 'string' || typeof subject.name !== 'string') {
      return [];
    }
    return [{
      _id: subject._id,
      name: subject.name,
      icon: typeof subject.icon === 'string' ? subject.icon : '/images/img.png',
    }];
  });
}

export function toPublicExams(value: unknown): PublicExam[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry: unknown) => {
    if (!entry || typeof entry !== 'object') return [];
    const exam = entry as Record<string, unknown>;
    const subject = typeof exam.subject === 'string'
      ? exam.subject
      : exam.subject && typeof exam.subject === 'object'
        ? (exam.subject as Record<string, unknown>)._id
        : null;
    if (
      typeof exam._id !== 'string' ||
      typeof exam.title !== 'string' ||
      typeof subject !== 'string'
    ) {
      return [];
    }
    return [{
      _id: exam._id,
      title: exam.title,
      subject,
      duration: typeof exam.duration === 'number' ? exam.duration : 0,
      numberOfQuestions: typeof exam.numberOfQuestions === 'number'
        ? exam.numberOfQuestions
        : 0,
    }];
  });
}
