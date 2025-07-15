import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  const cookies = req.cookies;

  const response = await fetch(process.env.API + "/subjects", {
    headers: {
      ...JSON_HEADER,
      token: token?.token ?? "",
    },
  });

  const payload = await response.json();
  return NextResponse.json(payload);
}
