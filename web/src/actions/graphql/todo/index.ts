"use server";

import { getSdk } from "./operation.generated";
import { getCookieSession } from "@/actions/session";
import { graphQLClient } from "@/graphql/client";

export const fetchToDos = async () => {
  const session = getCookieSession();
  if (session == null) {
    throw new Error("not authorization.");
  }

  graphQLClient.setHeader("Authorization", `Bearer ${session}`);
  const sdk = getSdk(graphQLClient);
  const data = await sdk.Query();
  console.log(JSON.stringify({ data }, null, 4));
};
