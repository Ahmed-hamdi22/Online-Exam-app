import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { readPublicCatalog } from '@/lib/server/public-catalog';

export async function GET(
  req: NextRequest,
  { params }: { params: { examsId: string } }
) {
  const token = await getToken({ req });
  const { examsId } = params;

  if (!examsId) {
    return NextResponse.json({ error: 'Missing examId' }, { status: 400 });
  }

  if (!token?.token) {
    const exams = await readPublicCatalog('exams');
    const exam = exams?.find((item) => item._id === examsId);
    return exam
      ? NextResponse.json({ message: 'success', exam })
      : NextResponse.json({ message: 'Exam not found' }, { status: 404 });
  }

  try {
    const response = await fetch(`${process.env.API}/exams/${examsId}`, {
      headers: {
        ...JSON_HEADER,
        token: token.token,
      },
    });
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: text || 'Failed to fetch exam' },
        { status: response.status }
      );
    }

    const payload = await response.json();
    return NextResponse.json(payload);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
