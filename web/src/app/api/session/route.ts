import { adminSDK } from "@/firebase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const json = await request.json();
  const idToken = json.idToken as string;
  // 5 days
  const expiresIn = 60 * 60 * 5 * 1000;
  const decodedClaims = await adminSDK.auth().verifyIdToken(idToken);
  const sessionCookie = await adminSDK
    .auth()
    .createSessionCookie(idToken, { expiresIn });
  const res = NextResponse.json({});
  res.cookies.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: false,
  });
  return res;
};
