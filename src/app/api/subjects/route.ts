import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  const response = await fetch(process.env.API + '/subjects', {
    headers: {
      ...JSON_HEADER,
      token: token?.token ?? '',
    },
  });

  const payload: APIResponse<subjects> = await response.json();
  return NextResponse.json(payload);
}
