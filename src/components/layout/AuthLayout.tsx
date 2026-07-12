import type { ReactNode } from "react";
import { Footer } from "../footer/Footer";

interface AuthLayoutProps {
  hero: ReactNode;
  form: ReactNode;
}

export const AuthLayout = ({ hero, form }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black relative font-sans">
      <div className="flex w-full flex-1">
        {/* Left Section - Hidden on mobile */}
        <div className="hidden lg:flex flex-col relative z-10 bg-[#000000] w-[57%]">
          {hero}
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-[43%] flex relative z-10 bg-[#121212] border-l border-[#262626]">
          {form}
        </div>
      </div>

      <Footer />
    </div>
  );
};
