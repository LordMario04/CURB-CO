"use client";
import { useState, useEffect, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { IconShoppingBag } from "@tabler/icons-react";
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
  const totalItems = useCartStore((state) => state.getTotalItems());
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[5000] h-16 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-gradient-to-b from-black/70 to-transparent border-b border-transparent",
        className
      )}
    >
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Volver al inicio"
          className="text-white text-2xl tracking-[4px] uppercase"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          CURB<span className="text-[#FF3B30]"> CO.</span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((navItem) => (
            <Link
              key={navItem.link}
              href={navItem.link}
              className="px-4 py-2 text-xs tracking-[2px] uppercase text-neutral-300 hover:text-white transition-colors"
            >
              {navItem.name}
            </Link>
          ))}
        </nav>

        {/* Carrito + Login */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            aria-label="Carrito"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconShoppingBag
              size={20}
              className="text-white/70 hover:text-white transition-colors"
            />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            href="/login"
            className="bg-[#FF3B30] text-white px-5 py-2 text-xs tracking-[2px] uppercase hover:bg-[#cc2f26] transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};