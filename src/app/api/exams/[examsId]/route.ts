import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { examsId: string } }
) {
  const token = await getToken({ req });
  if (!token?.token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { examsId } = params;

  if (!examsId) {
    return NextResponse.json({ error: 'Missing examId' }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.API}/exams/${examsId}`, {
      headers: { ...JSON_HEADER, token: token.token },
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
