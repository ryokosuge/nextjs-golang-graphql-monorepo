"use server";

import { GraphQLClient } from "graphql-request";
import { getCookieSession } from "./session";

const client = new GraphQLClient(process.env.API_URL);

export async function graphQLClient() {
  const session = await getCookieSession();
  client.setHeader("Authorization", `Bearer ${session}`);
  return client;
}
