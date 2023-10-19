"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth";

export type Props = {
  id: string;
  username: string;
  email: string;
};

export default function Page({ id, username, email }: Props) {
  const { logout } = useAuth();
  const router = useRouter();
  const handleButtonClick = useCallback(async () => {
    await logout();
    router.replace("/");
  }, [logout, router]);

  return (
    <main>
      <dl>
        <dt>ID</dt>
        <dd>{id}</dd>
        <dt>Name</dt>
        <dd>{username}</dd>
        <dt>Email</dt>
        <dd>{email}</dd>
      </dl>
      <button onClick={handleButtonClick}>ログアウトする</button>
    </main>
  );
}
