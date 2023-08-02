import * as Types from "../../../graphql/type";

import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
import gql from "graphql-tag";
export type GetMeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    firebaseuuid: string;
  };
};

export type UpsertUserMutationVariables = Types.Exact<{
  input: Types.CreateUserInput;
}>;

export type UpsertUserMutation = {
  __typename?: "Mutation";
  upsertUser: {
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    firebaseuuid: string;
  };
};

export const GetMeDocument = gql`
  query GetMe {
    me {
      id
      name
      email
      firebaseuuid
    }
  }
`;
export const UpsertUserDocument = gql`
  mutation UpsertUser($input: CreateUserInput!) {
    upsertUser(input: $input) {
      id
      name
      email
      firebaseuuid
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
    GetMe(
      variables?: GetMeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetMeQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetMeQuery>(GetMeDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "GetMe",
        "query",
      );
    },
    UpsertUser(
      variables: UpsertUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpsertUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpsertUserMutation>(UpsertUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "UpsertUser",
        "mutation",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
