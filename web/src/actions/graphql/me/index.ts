"use server";

import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";
import { getSdk } from "./operations.generated";

const client = new GraphQLClient("http://api:8080/query");

export const me = async () => {
  const store = cookies();
  const session = store.get("session")?.value;
  if (session == null) {
    throw new Error("not authorization.");
  }

  client.setHeader("Authorization", `Bearer ${session}`);

  try {
    const sdk = getSdk(client);
    const result = await sdk.Query();
    return result.me;
  } catch (error) {
    console.error(error);
    return null;
  }
};
