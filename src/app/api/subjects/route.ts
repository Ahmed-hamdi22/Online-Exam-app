import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import {
  readPublicCatalog,
  savePublicCatalog,
  toPublicSubjects,
} from '@/lib/server/public-catalog';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.token) {
    const subjects = await readPublicCatalog('subjects');
    return subjects
      ? NextResponse.json({ message: 'success', subjects })
      : NextResponse.json(
          { message: 'The public catalog is being prepared.' },
          { status: 503 }
        );
  }

  const response = await fetch(process.env.API + '/subjects', {
    headers: {
      ...JSON_HEADER,
      token: token.token,
    },
  });

  const payload: APIResponse<subjects> = await response.json();
  if (response.ok && 'subjects' in payload) {
    await savePublicCatalog('subjects', toPublicSubjects(payload.subjects));
  }
  return NextResponse.json(payload, { status: response.status });
}
