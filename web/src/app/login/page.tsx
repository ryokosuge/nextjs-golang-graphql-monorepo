import { NextPage } from "next";
import { default as LoginPage } from "@/components/pages/Login";

export type Props = {};

const Page: NextPage<Props> = () => {
  return <LoginPage />;
};

export default Page;
