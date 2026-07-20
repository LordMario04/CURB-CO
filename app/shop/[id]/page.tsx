"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconShirt, IconTag, IconUser } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";

const navItems = [
  { name: "Shop", link: "/shop", icon: <IconShirt size={16} /> },
  { name: "Brands", link: "/brands", icon: <IconTag size={16} /> },
  { name: "New Drops", link: "/new", icon: <IconHome size={16} /> },
  { name: "Sale", link: "/sale", icon: <IconUser size={16} /> },
];

// Producto de ejemplo - después vendrá del backend
const product = {
  id: 1,
  brand: "Thrasher",
  title: "Mag Logo Hoodie",
  price: "$89.900",
  description: "Hoodie clásico de Thrasher con el icónico logo Mag en el pecho. Algodón 100%, corte regular, disponible en negro.",
  sizes: ["S", "M", "L", "XL", "XXL"],
  tag: "Hot",
};

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center mb-12">
          <a href="/" className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-white transition-colors">Home</a>
          <span className="text-white/10 text-[10px]">/</span>
          <a href="/shop" className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-white transition-colors">Shop</a>
          <span className="text-white/10 text-[10px]">/</span>
          <span className="text-[#FF3B30] text-[10px] tracking-[2px] uppercase">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-[#111] border border-white/5 rounded-sm flex items-center justify-center min-h-[500px]"
          >
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#FF3B30] text-white text-[9px] tracking-[1px] uppercase px-2 py-1">
                {product.tag}
              </span>
            )}
            <span className="text-white/10 text-8xl font-bold tracking-widest uppercase">
              {product.brand.slice(0, 2)}
            </span>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">{product.brand}</p>
              <h1 className="text-white text-3xl font-bold tracking-wide mb-4">{product.title}</h1>
              <span className="text-[#FF3B30] text-2xl font-medium">{product.price}</span>
            </div>

            <p className="text-white/30 text-sm leading-relaxed tracking-wide">
              {product.description}
            </p>

            {/* Tallas */}
            <div>
              <p className="text-white/40 text-[10px] tracking-[2px] uppercase mb-3">Talla</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-xs tracking-[1px] border transition-all ${
                      selectedSize === size
                        ? "border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/10"
                        : "border-white/10 text-white/40 hover:border-white/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-3 mt-4">
              <button className="w-full bg-[#FF3B30] text-white py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors">
                Agregar al carrito
              </button>
              <button className="w-full border border-white/10 text-white/40 py-4 text-xs tracking-[3px] uppercase hover:border-white/30 transition-colors">
                Comprar ahora
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}