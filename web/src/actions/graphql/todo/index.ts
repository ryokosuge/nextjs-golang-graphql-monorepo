"use server";

import { graphQLClient } from "@/actions/graphql-request-client";
import { getSdk } from "./operation.generated";

export const fetchToDos = async () => {
  const client = await graphQLClient();
  const sdk = getSdk(client);
  return await sdk.FetchTodos();
};
