"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { LampContainer } from "@/components/ui/lamp";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconHome,
  IconShirt,
  IconShoe,
  IconSunglasses,
  IconTag,
  IconTrowel,
  IconUser,
} from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "motion/react";

const navItems = [
  { name: "Shop", link: "/shop", icon: <IconShirt size={16} /> },
  { name: "Brands", link: "/brands", icon: <IconTag size={16} /> },
  { name: "New Drops", link: "/new", icon: <IconHome size={16} /> },
  { name: "Sale", link: "/sale", icon: <IconUser size={16} /> },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="mt-8 py-4 text-center text-6xl font-bold tracking-widest text-white uppercase md:text-8xl"
        >
          CURB CO.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          className="text-center text-[#FF3B30] tracking-[4px] uppercase text-sm mt-2"
        >
          From the Curb Up.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
          className="flex gap-4 mt-8"
        >
          <button className="bg-[#FF3B30] text-white px-8 py-3 text-xs tracking-[2px] uppercase hover:bg-[#cc2f26] transition-colors">
            Ver colección
          </button>
          <button className="border border-white/20 text-white px-8 py-3 text-xs tracking-[2px] uppercase hover:border-white/50 transition-colors">
            New drops
          </button>
        </motion.div>
      </LampContainer>
      {/* Barra de marcas */}
      <div className="w-full border-y border-white/5 py-6 bg-[#0a0a0a]">
        <InfiniteMovingCards
          items={[
            { name: "Thrasher" },
            { name: "Santa Cruz" },
            { name: "Vans" },
            { name: "Independent" },
            { name: "Volcom" },
            { name: "DC Shoes" },
            { name: "HUF" },
            { name: "Brixton" },
          ]}
          speed="normal"
        />
      </div>
      {/* Productos más vendidos */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-white text-xs tracking-[4px] uppercase">
            Más vendidos
          </h2>
          <span className="text-[#FF3B30] text-xs tracking-[2px] uppercase cursor-pointer hover:underline">
            Ver todo →
          </span>
        </div>
        <HoverEffect
          items={[
            {
              brand: "Thrasher",
              title: "Mag Logo Hoodie",
              price: "$89.900",
              tag: "Hot",
            },
            { brand: "Vans", title: "Old Skool Pro", price: "$129.900" },
            {
              brand: "Santa Cruz",
              title: "Screaming Hand Tee",
              price: "$45.900",
              tag: "Sale",
            },
            { brand: "Volcom", title: "Full Stone Cap", price: "$38.900" },
          ]}
        />
      </section>
      {/* Categorías */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-white text-xs tracking-[4px] uppercase">
            Categorías
          </h2>
        </div>
        <BentoGrid>
          <BentoGridItem
            title="Ropa"
            count="120"
            icon={<IconShirt size={28} />}
          />
          <BentoGridItem
            title="Zapatillas"
            count="85"
            icon={<IconShoe size={28} />}
          />
          <BentoGridItem
            title="Accesorios"
            count="64"
            icon={<IconSunglasses size={28} />}
          />
          <BentoGridItem
            title="Skate Gear"
            count="43"
            icon={<IconTrowel size={28} />}
          />
        </BentoGrid>
      </section>
      {/* Banner de oferta */}
      <section className="w-full max-w-6xl mx-auto px-6 py-8 mb-16">
        <div className="relative bg-[#111] border border-white/5 rounded-sm p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
          {/* Texto de fondo decorativo */}
          <span className="absolute right-0 top-0 text-[120px] font-bold text-white/[0.02] leading-none select-none pointer-events-none">
            30%
          </span>
          <div className="flex flex-col gap-2 z-10">
            <span className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase">
              Oferta limitada
            </span>
            <h3 className="text-white text-2xl font-bold tracking-wide">
              30% off línea Thrasher
            </h3>
            <p className="text-white/30 text-xs tracking-[1px]">
              Solo este fin de semana · Envío gratis desde $80.000
            </p>
          </div>
          <MovingBorderButton
            borderRadius="0px"
            borderClassName="bg-[radial-gradient(#FF3B30_40%,transparent_60%)]"
            className="bg-[#0a0a0a] border-[#FF3B30]/20 text-white text-xs tracking-[2px] uppercase"
            containerClassName="w-48 h-12"
          >
            Ver oferta
          </MovingBorderButton>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Marca */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="text-white text-lg font-bold tracking-[4px] uppercase">
              CURB CO.
            </span>
            <p className="text-white/20 text-xs tracking-[1px] leading-relaxed">
              From the Curb Up. Ropa y accesorios de skate desde Medellín.
            </p>
            <span className="text-[#FF3B30] text-[10px] tracking-[2px] uppercase">
              Built for the Streets.
            </span>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <span className="text-white text-[10px] tracking-[3px] uppercase">
              Shop
            </span>
            {["Ropa", "Zapatillas", "Accesorios", "Skate Gear", "Sale"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/30 text-xs tracking-[1px] hover:text-[#FF3B30] transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* Marcas */}
          <div className="flex flex-col gap-4">
            <span className="text-white text-[10px] tracking-[3px] uppercase">
              Marcas
            </span>
            {["Thrasher", "Vans", "Santa Cruz", "Volcom", "HUF"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 text-xs tracking-[1px] hover:text-[#FF3B30] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <span className="text-white text-[10px] tracking-[3px] uppercase">
              Info
            </span>
            {["Sobre nosotros", "Envíos", "Devoluciones", "Contacto"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/30 text-xs tracking-[1px] hover:text-[#FF3B30] transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/20 text-[10px] tracking-[1px]">
            © 2025 CURB CO. — Medellín, Colombia
          </span>
          <div className="flex gap-6">
            {["Instagram", "TikTok", "Pinterest"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-[#FF3B30] transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
