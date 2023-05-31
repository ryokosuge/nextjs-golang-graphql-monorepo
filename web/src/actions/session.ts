"use server";

import { adminSDK } from "@/firebase/server";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { cookies } from "next/headers";

export async function getUser(): Promise<UserRecord | null> {
  const store = cookies();
  const session = store.get("session")?.value;
  if (session == null) {
    return null;
  }

  try {
    const decodedClaims = await adminSDK
      .auth()
      .verifySessionCookie(session, true);
    return adminSDK.auth().getUser(decodedClaims.sub);
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export async function deleteSessionCookie() {
  const store = cookies();
  const session = store.get("session")?.value;
  if (session == null) {
    return;
  }

  try {
    store.delete("session");
    const decodeClaims = await adminSDK
      .auth()
      .verifySessionCookie(session, true);
    await adminSDK.auth().revokeRefreshTokens(decodeClaims.sub);
  } catch {}
}

export async function storeSessionCookie(idToken: string) {
  // 5 days
  const expiresIn = 60 * 60 * 5 * 1000;
  const decodedClaims = await adminSDK.auth().verifyIdToken(idToken);
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
    secure: false,
  });
}
