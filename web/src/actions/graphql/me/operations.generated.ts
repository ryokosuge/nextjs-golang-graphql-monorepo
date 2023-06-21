import * as Types from "../../../generated/gql/type";

import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
import gql from "graphql-tag";
export type QueryQueryVariables = Types.Exact<{ [key: string]: never }>;

export type QueryQuery = {
  __typename?: "Query";
  me: { __typename?: "User"; id: string; name: string; email: string };
};

export const QueryDocument = gql`
  query Query {
    me {
      id
      name
      email
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    Query(
      variables?: QueryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<QueryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<QueryQuery>(QueryDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Query",
        "query",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
