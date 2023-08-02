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
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /**
   * Define a Relay Cursor type:
   * https://relay.dev/graphql/connections.htm#sec-Cursor
   */
  Cursor: { input: any; output: any };
};

/**
 * CreateTodoInput is used for create Todo object.
 * Input was generated by ent.
 */
export type CreateTodoInput = {
  /** 完了かどうか */
  done?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** テキスト */
  text: Scalars["String"]["input"];
  userID: Scalars["ID"]["input"];
};

/**
 * CreateUserInput is used for create User object.
 * Input was generated by ent.
 */
export type CreateUserInput = {
  /** Eメール */
  email: Scalars["String"]["input"];
  /** Firebase AuthenticationのUUID */
  firebaseuuid: Scalars["String"]["input"];
  /** 名前 */
  name: Scalars["String"]["input"];
  todoIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createTodo: Todo;
  updateTodo: Todo;
  upsertUser: User;
};

export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};

export type MutationUpdateTodoArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateTodoInput;
};

export type MutationUpsertUserArgs = {
  input: CreateUserInput;
};

/**
 * An object with an ID.
 * Follows the [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
 */
export type Node = {
  /** The id of the object. */
  id: Scalars["ID"]["output"];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  /** Specifies an ascending order for a given `orderBy` argument. */
  Asc = "ASC",
  /** Specifies a descending order for a given `orderBy` argument. */
  Desc = "DESC",
}

/**
 * Information about pagination in a connection.
 * https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo
 */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["Cursor"]["output"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["Cursor"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  me: User;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  todos: TodoConnection;
  users: UserConnection;
};

export type QueryNodeArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryNodesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type QueryTodosArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TodoWhereInput>;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserWhereInput>;
};

export type Todo = Node & {
  __typename?: "Todo";
  /** 完了かどうか */
  done: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  /** テキスト */
  text: Scalars["String"]["output"];
  user: User;
};

/** A connection to a list of items. */
export type TodoConnection = {
  __typename?: "TodoConnection";
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type TodoEdge = {
  __typename?: "TodoEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["Cursor"]["output"];
  /** The item at the end of the edge. */
  node?: Maybe<Todo>;
};

/**
 * TodoWhereInput is used for filtering Todo objects.
 * Input was generated by ent.
 */
export type TodoWhereInput = {
  and?: InputMaybe<Array<TodoWhereInput>>;
  /** done field predicates */
  done?: InputMaybe<Scalars["Boolean"]["input"]>;
  doneNEQ?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** user edge predicates */
  hasUser?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasUserWith?: InputMaybe<Array<UserWhereInput>>;
  /** id field predicates */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  idGT?: InputMaybe<Scalars["ID"]["input"]>;
  idGTE?: InputMaybe<Scalars["ID"]["input"]>;
  idIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  idLT?: InputMaybe<Scalars["ID"]["input"]>;
  idLTE?: InputMaybe<Scalars["ID"]["input"]>;
  idNEQ?: InputMaybe<Scalars["ID"]["input"]>;
  idNotIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  not?: InputMaybe<TodoWhereInput>;
  or?: InputMaybe<Array<TodoWhereInput>>;
  /** text field predicates */
  text?: InputMaybe<Scalars["String"]["input"]>;
  textContains?: InputMaybe<Scalars["String"]["input"]>;
  textContainsFold?: InputMaybe<Scalars["String"]["input"]>;
  textEqualFold?: InputMaybe<Scalars["String"]["input"]>;
  textGT?: InputMaybe<Scalars["String"]["input"]>;
  textGTE?: InputMaybe<Scalars["String"]["input"]>;
  textHasPrefix?: InputMaybe<Scalars["String"]["input"]>;
  textHasSuffix?: InputMaybe<Scalars["String"]["input"]>;
  textIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  textLT?: InputMaybe<Scalars["String"]["input"]>;
  textLTE?: InputMaybe<Scalars["String"]["input"]>;
  textNEQ?: InputMaybe<Scalars["String"]["input"]>;
  textNotIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/**
 * UpdateTodoInput is used for update Todo object.
 * Input was generated by ent.
 */
export type UpdateTodoInput = {
  /** 完了かどうか */
  done?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** テキスト */
  text?: InputMaybe<Scalars["String"]["input"]>;
  userID?: InputMaybe<Scalars["ID"]["input"]>;
};

/**
 * UpdateUserInput is used for update User object.
 * Input was generated by ent.
 */
export type UpdateUserInput = {
  addTodoIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  clearTodos?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Eメール */
  email?: InputMaybe<Scalars["String"]["input"]>;
  /** Firebase AuthenticationのUUID */
  firebaseuuid?: InputMaybe<Scalars["String"]["input"]>;
  /** 名前 */
  name?: InputMaybe<Scalars["String"]["input"]>;
  removeTodoIDs?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type User = Node & {
  __typename?: "User";
  /** Eメール */
  email: Scalars["String"]["output"];
  /** Firebase AuthenticationのUUID */
  firebaseuuid: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  /** 名前 */
  name: Scalars["String"]["output"];
  todos?: Maybe<Array<Todo>>;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: "UserConnection";
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: "UserEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["Cursor"]["output"];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

/**
 * UserWhereInput is used for filtering User objects.
 * Input was generated by ent.
 */
export type UserWhereInput = {
  and?: InputMaybe<Array<UserWhereInput>>;
  /** email field predicates */
  email?: InputMaybe<Scalars["String"]["input"]>;
  emailContains?: InputMaybe<Scalars["String"]["input"]>;
  emailContainsFold?: InputMaybe<Scalars["String"]["input"]>;
  emailEqualFold?: InputMaybe<Scalars["String"]["input"]>;
  emailGT?: InputMaybe<Scalars["String"]["input"]>;
  emailGTE?: InputMaybe<Scalars["String"]["input"]>;
  emailHasPrefix?: InputMaybe<Scalars["String"]["input"]>;
  emailHasSuffix?: InputMaybe<Scalars["String"]["input"]>;
  emailIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  emailLT?: InputMaybe<Scalars["String"]["input"]>;
  emailLTE?: InputMaybe<Scalars["String"]["input"]>;
  emailNEQ?: InputMaybe<Scalars["String"]["input"]>;
  emailNotIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** firebaseUUID field predicates */
  firebaseuuid?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidContains?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidContainsFold?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidEqualFold?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidGT?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidGTE?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidHasPrefix?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidHasSuffix?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  firebaseuuidLT?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidLTE?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidNEQ?: InputMaybe<Scalars["String"]["input"]>;
  firebaseuuidNotIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** todos edge predicates */
  hasTodos?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasTodosWith?: InputMaybe<Array<TodoWhereInput>>;
  /** id field predicates */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  idGT?: InputMaybe<Scalars["ID"]["input"]>;
  idGTE?: InputMaybe<Scalars["ID"]["input"]>;
  idIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  idLT?: InputMaybe<Scalars["ID"]["input"]>;
  idLTE?: InputMaybe<Scalars["ID"]["input"]>;
  idNEQ?: InputMaybe<Scalars["ID"]["input"]>;
  idNotIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  /** name field predicates */
  name?: InputMaybe<Scalars["String"]["input"]>;
  nameContains?: InputMaybe<Scalars["String"]["input"]>;
  nameContainsFold?: InputMaybe<Scalars["String"]["input"]>;
  nameEqualFold?: InputMaybe<Scalars["String"]["input"]>;
  nameGT?: InputMaybe<Scalars["String"]["input"]>;
  nameGTE?: InputMaybe<Scalars["String"]["input"]>;
  nameHasPrefix?: InputMaybe<Scalars["String"]["input"]>;
  nameHasSuffix?: InputMaybe<Scalars["String"]["input"]>;
  nameIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  nameLT?: InputMaybe<Scalars["String"]["input"]>;
  nameLTE?: InputMaybe<Scalars["String"]["input"]>;
  nameNEQ?: InputMaybe<Scalars["String"]["input"]>;
  nameNotIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  not?: InputMaybe<UserWhereInput>;
  or?: InputMaybe<Array<UserWhereInput>>;
};
