import { redirect } from "next/navigation";

import { default as RootPage } from "@/components/pages/Root";
import { User } from "@/graphql/type";
import { me } from "@/actions/graphql/user";

const Page = async () => {
  let user: User;
  try {
    user = await me();
  } catch (error) {
    console.error(error);
    redirect("/login");
  }

  return <RootPage id={user.id} username={user.name} email={user.email} />;
};

export default Page;
