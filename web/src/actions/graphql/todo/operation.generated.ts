import * as Types from "../../../graphql/type";

import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
import gql from "graphql-tag";
export type FetchTodosQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchTodosQuery = {
  __typename?: "Query";
  todos: {
    __typename?: "TodoConnection";
    edges?: Array<{
      __typename?: "TodoEdge";
      node?: {
        __typename?: "Todo";
        id: string;
        text: string;
        done: boolean;
        user: { __typename?: "User"; id: string; name: string };
      } | null;
    } | null> | null;
  };
};

export const FetchTodosDocument = gql`
  query FetchTodos {
    todos {
      edges {
        node {
          id
          text
          done
          user {
            id
            name
          }
        }
      }
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
    FetchTodos(
      variables?: FetchTodosQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<FetchTodosQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchTodosQuery>(FetchTodosDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "FetchTodos",
        "query",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
