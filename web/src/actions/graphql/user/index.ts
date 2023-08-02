"use server";

import { getSdk } from "./operation.generated";
import { graphQLClient } from "@/actions/graphql-request-client";
import { getCookieSession } from "@/actions/session";

type CreateUserInput = {
  name: string | null;
  email: string | null;
  firebaseuuid: string;
};

export async function createUser(input: CreateUserInput) {
  const session = await getCookieSession();
  if (session == null) {
    throw new Error("Not found session.");
  }

  const sdk = getSdk(graphQLClient(session));
  const result = await sdk.UpsertUser({
    input: {
      email: input.email ?? "",
      firebaseuuid: input.firebaseuuid,
      name: input.name ?? "",
    },
  });
  return result.upsertUser;
}

export async function me() {
  const session = await getCookieSession();
  if (session == null) {
    throw new Error("Not found session.");
  }
  const sdk = getSdk(graphQLClient(session));
  const result = await sdk.GetMe();
  return result.me;
}
