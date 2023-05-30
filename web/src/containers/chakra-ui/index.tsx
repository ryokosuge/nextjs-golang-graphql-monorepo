"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export type Props = {};

export const ChakraUIProviders: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
};
