import type { Transition } from "framer-motion";

export const floatingAnimation = {
  animate: {
    y: [0, -10, 0]
  },
  transition: {
    repeat: Infinity,
    duration: 6,
    ease: "easeInOut"
  } as Transition
};

export const floatingIconAnimation = {
  animate: {
    y: [0, -8, 0],
    opacity: [0.8, 1, 0.8]
  },
  transition: {
    repeat: Infinity,
    duration: 4,
    ease: "easeInOut"
  } as Transition
};
