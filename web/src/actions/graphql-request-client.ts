import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.API_URL);

export function graphQLClient(session: string) {
  client.setHeader("Authorization", `Bearer ${session}`);
  return client;
}
