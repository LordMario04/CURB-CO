"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/lib/nav";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/api/products/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white/20 text-xs tracking-[2px] uppercase">
          Cargando...
        </p>
      </main>
    );

  if (notFound || !product)
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <p className="text-white/30 text-xs tracking-[3px] uppercase">
          Producto no encontrado
        </p>
        <Link
          href="/shop"
          className="text-[#FF3B30] text-xs tracking-[2px] uppercase hover:underline"
        >
          Volver al shop →
        </Link>
      </main>
    );

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="flex gap-2 items-center mb-12">
          <Link href="/" className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-white transition-colors">Home</Link>
          <span className="text-white/10 text-[10px]">/</span>
          <Link href="/shop" className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-white transition-colors">Shop</Link>
          <span className="text-white/10 text-[10px]">/</span>
          <span className="text-[#FF3B30] text-[10px] tracking-[2px] uppercase">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-[#111] border border-white/5 rounded-sm flex items-center justify-center min-h-[500px] overflow-hidden"
          >
            {product.tag && (
              <span className="absolute top-4 left-4 z-10 bg-[#FF3B30] text-white text-[9px] tracking-[1px] uppercase px-2 py-1">
                {product.tag}
              </span>
            )}
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <span className="text-white/10 text-8xl font-bold tracking-widest uppercase">
                {product.brand.slice(0, 2)}
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">{product.brand}</p>
              <h1 className="text-white text-4xl tracking-wide mb-4">{product.title}</h1>
              <span className="text-[#FF3B30] text-2xl font-medium">{product.price}</span>
            </div>

            <p className="text-white/30 text-sm leading-relaxed tracking-wide">
              Producto auténtico de {product.brand}. Categoría: {product.category}.
            </p>

            <div>
              <p className="text-white/40 text-[10px] tracking-[2px] uppercase mb-3">Talla</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
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

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    brand: product.brand,
                    title: product.title,
                    price: product.price,
                  })
                }
                className="w-full bg-[#FF3B30] text-white py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors"
              >
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