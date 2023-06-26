"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { Button, Flex, Heading } from "@chakra-ui/react";

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
    <Flex
      flexDirection="column"
      p={12}
      borderRadius={8}
      boxShadow="lg"
      backgroundColor="whiteAlpha.800"
    >
      <Heading mb={6}>Log In</Heading>
      <Button colorScheme="pink" onClick={handleButtonClick}>
        Google Login
      </Button>
    </Flex>
  );
};

export default Page;
