import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ExamsResponse } from '@/lib/types/exams';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import {
  readPublicCatalog,
  savePublicCatalog,
  toPublicExams,
} from '@/lib/server/public-catalog';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.token) {
    const exams = await readPublicCatalog('exams');
    return exams
      ? NextResponse.json({ message: 'success', exams })
      : NextResponse.json(
          { message: 'The public catalog is being prepared.' },
          { status: 503 }
        );
  }

  const response = await fetch(`${process.env.API}/exams`, {
    headers: {
      ...JSON_HEADER,
      token: token.token,
    },
  });

  const payload: APIResponse<ExamsResponse> = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        message: payload?.message || 'Failed to fetch exams',
        code: response.status,
      },
      { status: response.status }
    );
  }

  if ('exams' in payload) {
    await savePublicCatalog('exams', toPublicExams(payload.exams));
  }
  return NextResponse.json(payload);
}
