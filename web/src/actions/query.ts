"use server";

import { getSdk } from "@/graphql/todo.generated";
import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";

const client = new GraphQLClient("http://api:8080/query");

export const fetchToDos = async () => {
  const store = cookies();
  const session = store.get("session")?.value;
  if (session == null) {
    throw new Error("not authorization.");
  }

  client.setHeader("Authorization", `Bearer ${session}`);
  const sdk = getSdk(client);
  const data = await sdk.Query();
  console.log(JSON.stringify({ data }, null, 4));
};
