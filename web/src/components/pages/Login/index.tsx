"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { Button } from "@nextui-org/button";

export type Props = {};

const Page: FC<Props> = () => {
  const { login } = useAuth();
  const router = useRouter();

  const handleButtonClick = useCallback(async () => {
    try {
      await login();
    } catch (error: any) {
      console.error(error);
    }

    router.refresh();
    router.replace("/");
  }, [login, router]);

  return (
    <div className="flex flex-col p-unit-12 rounded-8 shadow-lg bg-white gap-6">
      <h1>Log In</h1>
      <Button onClick={handleButtonClick}>Google Login</Button>
    </div>
  );
};

export default Page;
