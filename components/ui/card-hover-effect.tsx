"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export type Product = {
  title: string;
  brand: string;
  price: string;
  tag?: string;
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: Product[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 py-6 gap-2", className)}>
      {items.map((item, idx) => (
        
          <a
            href={"/shop/" + (idx + 1)}
            key={idx}
            className="relative group block p-1 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#FF3B30]/10 block rounded-sm"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-sm h-full w-full overflow-hidden bg-[#111] border border-white/5 group-hover:border-[#FF3B30]/30 relative z-20 transition-colors">
            <div className="h-48 bg-[#1a1a1a] flex items-center justify-center relative">
              {item.tag && (
                <span className="absolute top-2 left-2 bg-[#FF3B30] text-white text-[9px] tracking-[1px] uppercase px-2 py-1">
                  {item.tag}
                </span>
              )}
              <span className="text-white/10 text-5xl font-bold tracking-widest uppercase">
                {item.brand.slice(0, 2)}
              </span>
            </div>
            <div className="p-4">
              <p className="text-white/30 text-[9px] tracking-[2px] uppercase mb-1">{item.brand}</p>
              <h4 className="text-white text-sm tracking-wide mb-3">{item.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-[#FF3B30] text-sm font-medium">{item.price}</span>
                <button className="text-[9px] tracking-[1px] uppercase text-white/40 border border-white/10 px-2 py-1 hover:border-[#FF3B30] hover:text-[#FF3B30] transition-colors">
                  + Add
                </button>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};