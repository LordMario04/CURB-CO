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
  count,
  image,
}: {
  className?: string;
  title?: string;
  count?: string;
  image?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end p-6 rounded-sm overflow-hidden cursor-pointer min-h-[200px] border border-white/5 hover:border-[#FF3B30]/40 transition-all duration-300",
        className
      )}
    >
      {/* Imagen de fondo */}
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
        />
      )}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10">
        <p className="text-white text-lg tracking-[3px] uppercase font-bold">{title}</p>
        {count && (
          <p className="text-white/40 text-[10px] tracking-[1px] mt-1">{count} productos</p>
        )}
      </div>
    </div>
  );
};