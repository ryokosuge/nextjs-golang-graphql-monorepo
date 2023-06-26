"use client";

import { Flex } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  // return <div>{children}</div>;
  return (
    <Flex
      w="100wh"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.200"
    >
      {children}
    </Flex>
  );
};

export default Layout;
