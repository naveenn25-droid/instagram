import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { ButtonProps } from "../../types";
import { motion } from "framer-motion";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth = true, children, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "h-[52px] rounded-full font-semibold text-[15px] flex items-center justify-center transition-all duration-300",
          fullWidth && "w-full",
          variant === "primary" && "bg-[#164a85] text-[#9ca3af]", // Disabled state look from the screenshot
          variant === "secondary" && "bg-transparent border border-[#363636] text-white hover:bg-[#1c1c1f]",
          variant === "ghost" && "bg-transparent border border-[#363636] text-[#3797f0] hover:bg-[#1c1c1f]",
          className
        )}
        ref={ref}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
