import { motion } from "framer-motion";
import { floatingAnimation } from "../../lib/motion";
import { cn } from "../../lib/utils";

interface ImageCardProps {
  src: string;
  className?: string;
  rotation?: number;
  scale?: number;
  delay?: number;
  main?: boolean;
}

export const ImageCard = ({ src, className, rotation = 0, scale = 1, delay = 0, main = false }: ImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale, rotate: rotation }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 60, damping: 20 }}
      className={cn(
        "absolute rounded-[32px] overflow-hidden will-change-transform",
        main ? "w-[320px] h-[420px] shadow-[0_40px_80px_rgba(0,0,0,0.45)] z-20" : "w-[320px] h-[420px] z-10",
        className
      )}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        {...floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay }}
        className="w-full h-full will-change-transform"
      >
        <img 
          src={src} 
          alt="Placeholder" 
          className="w-full h-full object-cover"
        />
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-[32px] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};
