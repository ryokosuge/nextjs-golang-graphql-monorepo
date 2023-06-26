import * as Types from "../../../graphql/type";

import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
import gql from "graphql-tag";
export type FetchTodoQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchTodoQuery = {
  __typename?: "Query";
  todos: Array<{ __typename?: "Todo"; id: string }>;
};

export const FetchTodoDocument = gql`
  query FetchTodo {
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
    FetchTodo(
      variables?: FetchTodoQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<FetchTodoQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchTodoQuery>(FetchTodoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "FetchTodo",
        "query",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
