import * as Types from "../generated/gql/type";

import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
import gql from "graphql-tag";
export type QueryQueryVariables = Types.Exact<{ [key: string]: never }>;

export type QueryQuery = {
  __typename?: "Query";
  todos: Array<{ __typename?: "Todo"; id: string }>;
};

export const QueryDocument = gql`
  query Query {
    todos {
      id
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
