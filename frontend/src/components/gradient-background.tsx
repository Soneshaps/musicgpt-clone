"use client";

import { motion } from "framer-motion";
import { FC } from "react";

export const GradientBackground: FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Smooth shifting gradient (ambient background) */}
      <motion.div
        className="absolute inset-0"
        initial={{
          background: "linear-gradient(120deg, #16191C, #4A0B4A, #0A3D62)",
        }}
        animate={{
          background: [
            "linear-gradient(120deg, #16191C, #4A0B4A, #0A3D62)",
            "linear-gradient(120deg, #4A0B4A, #0A3D62, #16191C)",
            "linear-gradient(120deg, #0A3D62, #16191C, #4A0B4A)",
          ],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 30, // slower cycle
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Gentle pulsing radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,0,150,0.15), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10, // slower pulse
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle vertical “equalizer” waves */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 12px)",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "150px 0px"],
        }}
        transition={{
          duration: 25, // very slow drift
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Soft horizontal wave drift */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,255,200,0.1) 0px, rgba(0,255,200,0.1) 1px, transparent 1px, transparent 25px)",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "0px 60px"],
        }}
        transition={{
          duration: 12, // slow scroll
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
