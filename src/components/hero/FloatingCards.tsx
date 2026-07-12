import { motion } from "framer-motion";
import { ImageCard } from "./ImageCard";
import { floatingIconAnimation } from "../../lib/motion";
import { Heart, Bell } from "lucide-react";

import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";

export const FloatingCards = () => {
  return (
    <div className="relative w-[400px] h-[500px] flex items-center justify-center">
      {/* Left Card - Rotated -7 degrees */}
      <ImageCard 
        src={hero2} 
        rotation={-7} 
        scale={0.9} 
        delay={0.2}
        className="-left-12 top-4"
      />
      
      {/* Right Card - Rotated +8 degrees */}
      <ImageCard 
        src={hero3} 
        rotation={8} 
        scale={0.9} 
        delay={0.4}
        className="-right-12 top-8"
      />
      
      {/* Main Center Card */}
      <ImageCard 
        src={hero1} 
        main 
        delay={0.6}
        className="z-20"
      />

      {/* Floating Glass UI Elements */}
      <motion.div 
        {...floatingIconAnimation}
        className="absolute left-[-20px] top-[40%] z-30 w-12 h-12 rounded-full bg-gradient-to-tr from-[#ff3040] to-[#ff7a00] flex items-center justify-center shadow-lg will-change-transform"
      >
        <Heart className="w-6 h-6 text-white fill-white" />
      </motion.div>

      <motion.div 
        {...floatingIconAnimation}
        transition={{ ...floatingIconAnimation.transition, delay: 1 }}
        className="absolute right-[-10px] top-[20%] z-30 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg will-change-transform"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff3040] to-[#ff7a00] flex items-center justify-center">
          <Bell className="w-3 h-3 text-white fill-white" />
        </div>
        <span className="text-white text-sm font-medium">1</span>
      </motion.div>

      <motion.div 
        {...floatingIconAnimation}
        transition={{ ...floatingIconAnimation.transition, delay: 0.5 }}
        className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-30 w-[180px] h-[6px] rounded-full bg-white/20 backdrop-blur-xl border border-white/10 overflow-hidden will-change-transform"
      >
        <div className="w-2/3 h-full bg-white rounded-full" />
      </motion.div>
    </div>
  );
};
