import { redirect } from "next/navigation";
import { getUser } from "@/actions/session";

import { default as RootPage } from "@/components/pages/Root";
import { fetchToDos } from "@/actions/graphql/todo";
import { me } from "@/actions/graphql/me";

const Page = async () => {
  const user = await me();
  if (user == null) {
    redirect("/login");
  }

  const d = await fetchToDos();
  console.log(d);

  return <RootPage id={user.id} username={user.name} email={user.email} />;
};

export default Page;
