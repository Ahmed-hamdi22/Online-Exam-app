import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  const cookies = req.cookies;
  const { searchParams } = new URL(req.url); // Get query params from request URL
  const quizeId = searchParams.get("exam");

  if (!quizeId) {
    return NextResponse.json(
      { error: "Missing subject ID in query parameters" },
      { status: 400 }
    );
  }
  const response = await fetch(`${process.env.API}/questions?exam=${quizeId}`, {
    headers: {
      ...JSON_HEADER,
      token: token?.token ?? "",
    },
  });

  const payload = await response.json();
  return NextResponse.json(payload);
}
