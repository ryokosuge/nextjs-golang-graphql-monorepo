import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: applicationDefault(),
  });
}

export const adminSDK = admin;
