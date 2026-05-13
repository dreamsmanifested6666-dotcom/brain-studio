"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { easeCinematic } from "@/lib/animations";

/**
 * Page-transition wrapper. Each route keys a fresh template so the enter
 * animation re-fires on every navigation. The persistent BrainStage lives
 * in layout.tsx (parent) and doesn't unmount — it just glides toward the
 * destination page's first ScrollScene target. The 2D content fades up
 * over 650ms (cinematic) with a 12px translate.
 *
 * Reduced motion: the transform is dropped, only opacity crossfades.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeCinematic }}
    >
      {children}
    </motion.div>
  );
}
