"use client";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  icon,
  count,
}: {
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  count?: string;
}) => {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between p-6 rounded-sm border border-white/5 bg-[#111] hover:border-[#FF3B30]/40 hover:bg-[#1a1a1a] transition-all duration-200 cursor-pointer min-h-[140px]",
        className
      )}
    >
      <div className="text-[#FF3B30] text-2xl group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <div>
        <p className="text-white text-xs tracking-[3px] uppercase font-medium">{title}</p>
        {count && (
          <p className="text-white/20 text-[10px] tracking-[1px] mt-1">{count} productos</p>
        )}
      </div>
    </div>
  );
};