"use server";

import { adminSDK } from "@/firebase/server";
import { cookies } from "next/headers";
import { EXPIRED_IN, SESSION_KEY_NAME } from "./constants";

export async function getCookieSession() {
  const store = cookies();
  const session = store.get(SESSION_KEY_NAME)?.value;
  if (session == null) {
    return null;
  }

  return session;
}

export async function revokeSession() {
  const store = cookies();
  const session = store.get(SESSION_KEY_NAME)?.value;
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
  store.set(SESSION_KEY_NAME, "", {
    maxAge: 0,
  });
}

export async function storeSession(idToken: string) {
  const decodedClaims = await adminSDK.auth().verifyIdToken(idToken);
  // 5 min
  if (new Date().getTime() / 1000 - decodedClaims.auth_time >= 5 * 60) {
    // expired id token
    throw new Error("expired id token.");
  }

  const sessionCookie = await adminSDK
    .auth()
    .createSessionCookie(idToken, { expiresIn: EXPIRED_IN });
  const store = cookies();
  store.set(SESSION_KEY_NAME, sessionCookie, {
    maxAge: EXPIRED_IN,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}
