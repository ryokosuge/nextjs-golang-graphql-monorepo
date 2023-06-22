import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://api:8080/query");

export const graphQLClient = client;
