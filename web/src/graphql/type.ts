export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: "Mutation";
  createTodo: Todo;
  noop?: Maybe<Scalars["ID"]["output"]>;
};

export type MutationCreateTodoArgs = {
  input: NewTodo;
};

export type MutationNoopArgs = {
  input?: InputMaybe<Scalars["ID"]["input"]>;
};

export type NewTodo = {
  text: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type Node = {
  id: Scalars["ID"]["output"];
};

export type Query = {
  __typename?: "Query";
  me: User;
  node: Node;
  todos: Array<Todo>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"]["input"];
};

export type Todo = Node & {
  __typename?: "Todo";
  done: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  text: Scalars["String"]["output"];
  user: User;
};

export type User = Node & {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};
