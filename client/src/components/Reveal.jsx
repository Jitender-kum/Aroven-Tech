import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal = ({ children, width = "fit-content", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Sirf ek baar animate karega
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 }, // Shuru mein neeche aur gayab
          visible: { opacity: 1, y: 0 }, // Baad mein upar aur dikhega
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: delay, ease: "easeOut" }} // Smoothness setting
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;