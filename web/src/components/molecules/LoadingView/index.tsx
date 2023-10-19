"use client";

import { CircularProgress } from "@nextui-org/progress";

export type Props = {};
export const LoadingView: React.FC<Props> = () => {
  return <CircularProgress />;
};
