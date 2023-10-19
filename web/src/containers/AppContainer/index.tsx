import { PropsWithChildren } from "react";
import { AuthProvider } from "@/context/auth";
import { NextUIProvider } from "../NextUI";

export type Props = {};
const AppContainer: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <NextUIProvider>
      <AuthProvider>
        <div className="flex w-screen h-screen items-center justify-center bg-gray-200">
          {children}
        </div>
      </AuthProvider>
    </NextUIProvider>
  );
};

export default AppContainer;
