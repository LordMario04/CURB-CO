"use client";
import { useState, type ReactNode } from "react";
import { useCartStore } from "@/store/cartStore";
import { IconShoppingBag } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/90 px-2 py-1.5 shadow-lg shadow-black/40 backdrop-blur-md">
          {/* Nav items */}
          <div className="flex items-center gap-1">
            {navItems.map((navItem) => (
              <a
                key={navItem.link}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.name}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-white/10" />

          {/* Carrito */}
          <a href="/cart" className="relative flex items-center justify-center w-8 h-8">
            <IconShoppingBag size={18} className="text-white/60 hover:text-white transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </a>

          {/* Login */}
          <a
            href="/login"
            className="relative rounded-full bg-[#FF3B30] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#cc2f26]"
          >
            <span>Login</span>
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};