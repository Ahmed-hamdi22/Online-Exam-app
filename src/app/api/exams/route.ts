import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  // Check if token is missing
  if (!token?.token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const examId = searchParams.get("subject");

  if (!examId) {
    return NextResponse.json(
      { error: "Missing subject ID in query parameters" },
      { status: 400 }
    );
  }

  const response = await fetch(`${process.env.API}/exams?subject=${examId}`, {
    headers: {
      ...JSON_HEADER,
      token: token.token,
    },
  });

  const payload = await response.json();
  return NextResponse.json(payload);
}
