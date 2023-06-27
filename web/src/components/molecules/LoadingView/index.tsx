"use client";

import { Spinner } from "@chakra-ui/react";

export type Props = {};
export const LoadingView: React.FC<Props> = () => {
  return <Spinner size="lg" />;
};
