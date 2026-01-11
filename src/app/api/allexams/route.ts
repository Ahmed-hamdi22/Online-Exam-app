import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ExamsResponse } from '@/lib/types/exams';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.token) {
    return NextResponse.json(
      { message: 'Unauthorized', code: 401 },
      { status: 401 }
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

  return NextResponse.json(payload);
}
