"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IconHome, IconShirt, IconTag, IconUser } from "@tabler/icons-react";
import { useState } from "react";

const navItems = [
  { name: "Shop", link: "/shop", icon: <IconShirt size={16} /> },
  { name: "Brands", link: "/brands", icon: <IconTag size={16} /> },
  { name: "New Drops", link: "/new", icon: <IconHome size={16} /> },
  { name: "Sale", link: "/sale", icon: <IconUser size={16} /> },
];

const products = [
  { brand: "Thrasher", title: "Mag Logo Hoodie", price: "$89.900", tag: "Hot", category: "Ropa" },
  { brand: "Vans", title: "Old Skool Pro", price: "$129.900", category: "Zapatillas" },
  { brand: "Santa Cruz", title: "Screaming Hand Tee", price: "$45.900", tag: "Sale", category: "Ropa" },
  { brand: "Volcom", title: "Full Stone Cap", price: "$38.900", category: "Accesorios" },
  { brand: "HUF", title: "Essentials TT Hoodie", price: "$75.900", category: "Ropa" },
  { brand: "DC Shoes", title: "Pure High Top", price: "$110.900", category: "Zapatillas" },
  { brand: "Independent", title: "Bar Logo Tee", price: "$42.900", category: "Ropa" },
  { brand: "Brixton", title: "Oath Snapback", price: "$55.900", category: "Accesorios" },
];

const categories = ["Todos", "Ropa", "Zapatillas", "Accesorios", "Skate Gear"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      {/* Header */}
      <div className="w-full border-b border-white/5 pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">Curb Co.</p>
          <h1 className="text-white text-4xl font-bold tracking-widest uppercase">Shop</h1>
        </div>
      </div>

      {/* Filtros */}
      <div className="w-full border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[2px] uppercase transition-colors ${
                activeCategory === cat
                  ? "text-[#FF3B30]"
                  : "text-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Productos */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-white/20 text-[10px] tracking-[2px] mb-6">
          {filtered.length} productos
        </p>
        <HoverEffect items={filtered} className="grid-cols-2 md:grid-cols-4" />
      </div>
    </main>
  );
}