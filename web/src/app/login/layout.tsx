"use client";
import { Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
      {children}
    </Box>
  );
};

export default Layout;
