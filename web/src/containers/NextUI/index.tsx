"use client";

import { NextUIProvider as Provider } from "@nextui-org/react";

export type Props = {
  children: React.ReactNode;
};

export const NextUIProvider = ({ children }: Props) => (
  <Provider>{children}</Provider>
);
