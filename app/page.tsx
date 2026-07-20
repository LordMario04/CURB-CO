"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { LampContainer } from "@/components/ui/lamp";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconHome, IconShirt, IconShoe, IconSunglasses, IconTag, IconTrowel, IconUser } from "@tabler/icons-react";
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
    <h2 className="text-white text-xs tracking-[4px] uppercase">Categorías</h2>
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
      <div className="h-screen bg-[#0a0a0a]" />
    </main>
  );
}
