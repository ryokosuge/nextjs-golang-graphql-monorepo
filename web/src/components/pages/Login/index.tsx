"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

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
    <div>
      <h1>ログイン画面だよ</h1>
      <button onClick={handleButtonClick}>ログインしてみよう</button>
    </div>
  );
};

export default Page;
