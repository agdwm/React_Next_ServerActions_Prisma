import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider dynamic>
        <div className="grid place-items-center min-h-screen">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </ClerkProvider>
    </Suspense>
  );
};

export default AuthLayout;
