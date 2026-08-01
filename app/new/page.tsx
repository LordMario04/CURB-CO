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

const newProducts = [
  { brand: "Thrasher", title: "Flame Logo Crewneck", price: "$95.900", tag: "New" },
  { brand: "Vans", title: "Skate Authentic", price: "$115.900", tag: "New" },
  { brand: "HUF", title: "Plantlife Socks", price: "$22.900", tag: "New" },
  { brand: "Santa Cruz", title: "Dressen Rose Crew", price: "$79.900", tag: "New" },
  { brand: "Volcom", title: "Deadly Stones Tee", price: "$49.900", tag: "New" },
  { brand: "Independent", title: "Span Zip Hoodie", price: "$109.900", tag: "New" },
];

export default function NewDropsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      {/* Header */}
      <div className="w-full border-b border-white/5 pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto flex items-end justify-between">
          <div>
            <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">Curb Co.</p>
            <h1 className="text-white text-4xl font-bold tracking-widest uppercase">New Drops</h1>
          </div>
          <p className="text-white/20 text-[10px] tracking-[2px] uppercase">Temporada 2025</p>
        </div>
      </div>

      {/* Banner */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#111] border border-[#FF3B30]/20 p-8 mb-8 flex items-center justify-between"
        >
          <div>
            <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">Recién llegado</p>
            <h2 className="text-white text-2xl font-bold tracking-wide">Drop Semanal — Semana 30</h2>
            <p className="text-white/30 text-xs tracking-[1px] mt-2">Nuevos productos cada viernes. No te los pierdas.</p>
          </div>
          <div className="text-right">
            <p className="text-white/20 text-[10px] tracking-[2px] uppercase">Disponibles</p>
            <p className="text-[#FF3B30] text-3xl font-bold">{newProducts.length}</p>
          </div>
        </motion.div>
      </div>

      {/* Productos */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <HoverEffect items={newProducts} className="grid-cols-2 md:grid-cols-3" />
      </div>
    </main>
  );
}