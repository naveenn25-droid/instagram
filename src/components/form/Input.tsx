import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { InputProps } from "../../types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full h-[52px] rounded-[14px] bg-transparent border border-[#363636]",
          "px-4 text-[14px] text-white placeholder:text-[#7d7d86]",
          "focus:outline-none focus:border-[#7d7d86]",
          "transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
