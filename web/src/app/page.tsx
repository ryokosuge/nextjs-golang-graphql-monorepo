import { redirect } from "next/navigation";
import { deleteSession, getUser } from "@/actions/session";

import { default as RootPage } from "@/components/pages/Root";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/graphql/todo.generated";

const Page = async () => {
  const user = await getUser();
  if (user == null) {
    await deleteSession();
    redirect("/login");
  }

  const client = new GraphQLClient("http://api:8080/query");
  const sdk = getSdk(client);
  const data = await sdk.Query();
  console.log(data);

  return (
    <RootPage
      username={user.displayName ?? "N/A"}
      email={user.email ?? "N/A"}
    />
  );
};

export default Page;
