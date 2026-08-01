"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconShirt, IconTag, IconUser } from "@tabler/icons-react";
import { motion } from "motion/react";

const navItems = [
  { name: "Shop", link: "/shop", icon: <IconShirt size={16} /> },
  { name: "Brands", link: "/brands", icon: <IconTag size={16} /> },
  { name: "New Drops", link: "/new", icon: <IconHome size={16} /> },
  { name: "Sale", link: "/sale", icon: <IconUser size={16} /> },
];

const brands = [
  { name: "Thrasher", founded: "1981", origin: "San Francisco, CA", description: "La biblia del skateboarding. Icónica por su llama y su actitud sin filtros." },
  { name: "Santa Cruz", founded: "1973", origin: "Santa Cruz, CA", description: "Una de las marcas más antiguas del skate. Hogar del legendario Screaming Hand." },
  { name: "Vans", founded: "1966", origin: "Anaheim, CA", description: "La zapatilla del skate por excelencia. Desde la calle hasta las competencias." },
  { name: "Independent", founded: "1978", origin: "Santa Cruz, CA", description: "Los trucks más respetados del skateboarding. Built to grind." },
  { name: "Volcom", founded: "1991", origin: "Costa Mesa, CA", description: "True to This. Surf, skate y nieve con actitud californiana." },
  { name: "DC Shoes", founded: "1994", origin: "Carlsbad, CA", description: "Performance y estilo para skaters profesionales desde los 90." },
  { name: "HUF", founded: "2002", origin: "San Francisco, CA", description: "Fundada por Keith Hufnagel. Street style con raíces en el skate de SF." },
  { name: "Brixton", founded: "2004", origin: "Oceanside, CA", description: "Donde el skate se encuentra con el estilo clásico y el surf." },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      {/* Header */}
      <div className="w-full border-b border-white/5 pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">Curb Co.</p>
          <h1 className="text-white text-4xl font-bold tracking-widest uppercase">Marcas</h1>
        </div>
      </div>

      {/* Grid de marcas */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group bg-[#111] border border-white/5 hover:border-[#FF3B30]/30 transition-all p-8 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-sm">
                  <span className="text-white/20 text-xl font-bold tracking-widest group-hover:text-[#FF3B30] transition-colors">
                    {brand.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-white/20 text-[9px] tracking-[2px] uppercase">Desde</p>
                  <p className="text-white/40 text-sm">{brand.founded}</p>
                </div>
              </div>
              <h3 className="text-white text-lg font-bold tracking-[2px] uppercase mb-2">
                {brand.name}
              </h3>
              <p className="text-white/20 text-[10px] tracking-[1px] uppercase mb-3">
                {brand.origin}
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                {brand.description}
              </p>
              <div className="mt-6">
                <a
                  href={"/shop?brand=" + brand.name}
                  className="text-[#FF3B30] text-[10px] tracking-[2px] uppercase hover:underline"
                >
                  Ver productos →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}