import type { PropsWithChildren } from "react";

import logo from "../assets/logo.svg";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12">
      <div className="mb-6 sm:mb-8 flex items-center">
        <img src={logo} alt="Logo Financy" className="w-33.5 h-6.75" />
      </div>

      <div className="w-full max-w-md p-4 sm:p-6 lg:p-8 bg-white rounded-xl border border-gray-200 flex flex-col gap-6 sm:gap-8">
        {children}
      </div>
    </div>
  );
};

export { AuthLayout };
