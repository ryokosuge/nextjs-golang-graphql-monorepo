"use server";

import { getSdk } from "./operations.generated";
import { getCookieSession } from "@/actions/session";
import { graphQLClient } from "@/graphql/client";

export const me = async () => {
  const session = getCookieSession();
  if (session == null) {
    throw new Error("not authorization.");
  }

  graphQLClient.setHeader("Authorization", `Bearer ${session}`);

  try {
    const sdk = getSdk(graphQLClient);
    const result = await sdk.Query();
    return result.me;
  } catch (error) {
    console.error(error);
    return null;
  }
};
