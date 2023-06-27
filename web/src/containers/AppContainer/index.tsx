"use client";

import { PropsWithChildren } from "react";
import { ChakraUIProviders } from "@/containers/chakra-ui";
import { AuthProvider } from "@/context/auth";
import { Flex } from "@chakra-ui/react";

export type Props = {};
const AppContainer: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <ChakraUIProviders>
      <AuthProvider>
        <Flex
          w="100wh"
          h="100vh"
          alignItems="center"
          justifyContent="center"
          backgroundColor="gray.200"
        >
          {children}
        </Flex>
      </AuthProvider>
    </ChakraUIProviders>
  );
};

export default AppContainer;
