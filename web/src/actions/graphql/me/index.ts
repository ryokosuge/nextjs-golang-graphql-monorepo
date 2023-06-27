"use server";

import { getSdk } from "./operations.generated";
import { getCookieSession } from "@/actions/session";
import { graphQLClient } from "@/graphql/client";

export const me = async () => {
  const session = await getCookieSession();
  if (session == null) {
    throw new Error("not authorization.");
  }

  graphQLClient.setHeader("Authorization", `Bearer ${session}`);

  const sdk = getSdk(graphQLClient);
  const result = await sdk.GetMe();
  return result.me;
};
