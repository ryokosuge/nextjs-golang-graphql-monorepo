import { redirect } from "next/navigation";
import { deleteSessionCookie, getUser } from "@/actions/session";

import { default as RootPage } from "@/components/pages/Root";

const Page = async () => {
  const user = await getUser();
  if (user == null) {
    await deleteSessionCookie();
    redirect("/login");
  }

  return (
    <RootPage
      username={user.displayName ?? "N/A"}
      email={user.email ?? "N/A"}
    />
  );
};

export default Page;
