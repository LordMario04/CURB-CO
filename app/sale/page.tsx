"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IconHome, IconShirt, IconTag, IconUser } from "@tabler/icons-react";
import { motion } from "motion/react";

const navItems = [
  { name: "Shop", link: "/shop", icon: <IconShirt size={16} /> },
  { name: "Brands", link: "/brands", icon: <IconTag size={16} /> },
  { name: "New Drops", link: "/new", icon: <IconHome size={16} /> },
  { name: "Sale", link: "/sale", icon: <IconUser size={16} /> },
];

const saleProducts = [
  { brand: "Santa Cruz", title: "Screaming Hand Tee", price: "$35.900", tag: "Sale" },
  { brand: "Volcom", title: "Full Stone Cap", price: "$28.900", tag: "Sale" },
  { brand: "HUF", title: "Box Logo Tee", price: "$32.900", tag: "Sale" },
  { brand: "Brixton", title: "Oath Snapback", price: "$39.900", tag: "Sale" },
  { brand: "DC Shoes", title: "Kalis Vulc", price: "$89.900", tag: "Sale" },
  { brand: "Independent", title: "Bar Logo Tee", price: "$29.900", tag: "Sale" },
];

export default function SalePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      {/* Header */}
      <div className="w-full border-b border-white/5 pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto flex items-end justify-between">
          <div>
            <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">Curb Co.</p>
            <h1 className="text-white text-4xl font-bold tracking-widest uppercase">Sale</h1>
          </div>
          <p className="text-white/20 text-[10px] tracking-[2px] uppercase">Hasta 40% off</p>
        </div>
      </div>

      {/* Banner oferta */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {["10% off", "20% off", "40% off"].map((discount, idx) => (
            <div
              key={idx}
              className="bg-[#111] border border-white/5 p-6 text-center hover:border-[#FF3B30]/30 transition-colors"
            >
              <p className="text-[#FF3B30] text-3xl font-bold mb-1">{discount}</p>
              <p className="text-white/20 text-[10px] tracking-[2px] uppercase">
                {idx === 0 ? "Accesorios" : idx === 1 ? "Ropa" : "Zapatillas"}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Productos */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-white/20 text-[10px] tracking-[2px] uppercase">
            {saleProducts.length} productos en oferta
          </p>
          <p className="text-[#FF3B30] text-[10px] tracking-[2px] uppercase">Oferta por tiempo limitado</p>
        </div>
        <HoverEffect items={saleProducts} className="grid-cols-2 md:grid-cols-3" />
      </div>
    </main>
  );
}