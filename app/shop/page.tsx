"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import type { Product } from "@/components/ui/card-hover-effect";
import { navItems } from "@/lib/nav";
import { useState, useEffect } from "react";

const categories = ["Todos", "Ropa", "Zapatillas", "Accesorios", "Skate Gear"];

type ShopProduct = Product & { category?: string };

export default function ShopPage() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("error");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="w-full border-b border-white/5 pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">
            Curb Co.
          </p>
          <h1 className="text-white text-5xl tracking-widest uppercase">Shop</h1>
        </div>
      </div>

      <div className="w-full border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[2px] uppercase transition-colors whitespace-nowrap ${
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-white/20 text-xs tracking-[2px] uppercase">
            Cargando productos...
          </p>
        ) : error ? (
          <p className="text-white/30 text-xs tracking-[2px] uppercase">
            No se pudieron cargar los productos. ¿Está corriendo el backend?
          </p>
        ) : (
          <>
            <p className="text-white/20 text-[10px] tracking-[2px] mb-6">
              {filtered.length} productos
            </p>
            <HoverEffect items={filtered} />
          </>
        )}
      </div>
    </main>
  );
}