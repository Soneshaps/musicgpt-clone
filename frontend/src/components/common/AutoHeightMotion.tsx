import { motion } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";

export const AutoHeightMotion = ({
  children,
  dependency,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependency: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useLayoutEffect(() => {
    if (ref.current) {
      const newHeight = ref.current.scrollHeight;
      if (newHeight !== height) {
        setHeight(newHeight); // measure content height
      }
    }
  }, [dependency, children, height]); // re-measure when tool changes or content updates

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth height animation
      }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
