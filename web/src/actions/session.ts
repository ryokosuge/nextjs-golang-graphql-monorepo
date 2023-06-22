"use server";

import { adminSDK } from "@/firebase/server";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { cookies } from "next/headers";

export async function getCookieSession() {
  const store = cookies();
  const session = store.get("session")?.value;
  if (session == null) {
    return null;
  }

  return session;
}

export async function revokeSession() {
  const store = cookies();
  const session = store.get("session")?.value;
  if (session == null) {
    return;
  }

  try {
    const decodeClaims = await adminSDK
      .auth()
      .verifySessionCookie(session, true);
    await adminSDK.auth().revokeRefreshTokens(decodeClaims.sub);
  } catch (error: any) {
    console.error(error);
  }
}

export async function deleteSession() {
  const store = cookies();
  store.set("session", "", {
    maxAge: 0,
  });
}

// expires id token
// 5 days
const expiresIn = 60 * 60 * 5 * 1000;

export async function storeSession(idToken: string) {
  const decodedClaims = await adminSDK.auth().verifyIdToken(idToken);
  // 5 min
  if (new Date().getTime() / 1000 - decodedClaims.auth_time >= 5 * 60) {
    // expired id token
    throw new Error("expired id token.");
  }

  const sessionCookie = await adminSDK
    .auth()
    .createSessionCookie(idToken, { expiresIn });
  const store = cookies();
  store.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}
