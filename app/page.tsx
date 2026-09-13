"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconShirt,
  IconShoe,
  IconSunglasses,
  IconTrowel,
} from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "motion/react";
import Link from "next/link";
import { navItems } from "@/lib/nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />
      {/* Hero con video de fondo */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/skate.mp4" type="video/mp4" />
        </video>

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="text-7xl md:text-9xl font-bold tracking-widest text-white uppercase"
          >
            CURB CO.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="text-[#FF3B30] tracking-[6px] uppercase text-sm"
          >
            From the Curb Up.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
            className="flex gap-4 mt-4"
          >
            <Link
              href="/shop"
              className="bg-[#FF3B30] text-white px-10 py-3 text-xs tracking-[2px] uppercase hover:bg-[#cc2f26] transition-colors"
            >
              Ver colección
            </Link>
            <Link
              href="/new"
              className="border border-white/40 text-white px-10 py-3 text-xs tracking-[2px] uppercase hover:border-white transition-colors"
            >
              New drops
            </Link>
          </motion.div>
        </div>
      </div>
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
          <Link
            href="/shop"
            className="text-[#FF3B30] text-xs tracking-[2px] uppercase hover:underline"
          >
            Ver todo →
          </Link>
        </div>
        <HoverEffect
          items={[
            {
              id: 17,
              brand: "Thrasher",
              title: "Mag Logo Hoodie",
              price: "$89.900",
              tag: "Hot",
              image:
                "https://i.ebayimg.com/images/g/7A4AAOSwcOZlrhMW/s-l1200.jpg",
            },
            {
              id: 18,
              brand: "Vans",
              title: "Old Skool Pro",
              price: "$129.900",
              tag: "Sold Out",
              image:
                "https://cdn-images.farfetch-contents.com/15/94/58/48/15945848_44299334_1000.jpg",
            },
            {
              id: 19,
              brand: "Santa Cruz",
              title: "Screaming Hand Tee",
              price: "$45.900",
              tag: "Sale",
              image:
                "https://img.nhs-info.com/heroes/santa_cruz_skateboards_screaming_hand_mobile_1699999705.jpg",
            },
            {
              id: 20,
              brand: "Volcom",
              title: "Full Stone Cap",
              price: "$38.900",
              tag: "New",
              image:
                "https://www.volcom.com.au/cdn/shop/files/D5512320_BLK_100.jpg?v=1734070421&width=1420",
            },
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
          <Link href="/sale">
            <MovingBorderButton
              borderRadius="0px"
              borderClassName="bg-[radial-gradient(#FF3B30_40%,transparent_60%)]"
              className="bg-[#0a0a0a] border-[#FF3B30]/20 text-white text-xs tracking-[2px] uppercase"
              containerClassName="w-48 h-12"
            >
              Ver oferta
            </MovingBorderButton>
          </Link>
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
            {[
              { label: "Ropa", href: "/shop" },
              { label: "Zapatillas", href: "/shop" },
              { label: "Accesorios", href: "/shop" },
              { label: "Skate Gear", href: "/shop" },
              { label: "Sale", href: "/sale" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/30 text-xs tracking-[1px] hover:text-[#FF3B30] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Marcas */}
          <div className="flex flex-col gap-4">
            <span className="text-white text-[10px] tracking-[3px] uppercase">
              Marcas
            </span>
            {["Thrasher", "Vans", "Santa Cruz", "Volcom", "HUF"].map((item) => (
              <Link
                key={item}
                href="/brands"
                className="text-white/30 text-xs tracking-[1px] hover:text-[#FF3B30] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <span className="text-white text-[10px] tracking-[3px] uppercase">
              Info
            </span>
            {[
              { label: "Sobre nosotros", href: "#" },
              { label: "Envíos", href: "#" },
              { label: "Devoluciones", href: "#" },
              { label: "Contacto", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/30 text-xs tracking-[1px] hover:text-[#FF3B30] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/20 text-[10px] tracking-[1px]">
            © 2026 CURB CO. — Medellín, Colombia
          </span>
          <div className="flex gap-6">
            {["Instagram", "TikTok", "Pinterest"].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-[#FF3B30] transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
