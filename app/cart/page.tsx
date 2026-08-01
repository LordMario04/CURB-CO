"use client";
import { useCartStore } from "@/store/cartStore";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconShirt, IconTag, IconHome, IconUser, IconTrash } from "@tabler/icons-react";
import { motion } from "motion/react";
import { Link } from "lucide-react";

const navItems = [
  { name: "Shop", link: "/shop", icon: <IconShirt size={16} /> },
  { name: "Brands", link: "/brands", icon: <IconTag size={16} /> },
  { name: "New Drops", link: "/new", icon: <IconHome size={16} /> },
  { name: "Sale", link: "/sale", icon: <IconUser size={16} /> },
];

export default function CartPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[$,.]/g, "")) / 100;
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">Curb Co.</p>
            <h1 className="text-white text-4xl font-bold tracking-widest uppercase">Carrito</h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-[#FF3B30] transition-colors"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <p className="text-white/20 text-xs tracking-[3px] uppercase">Tu carrito está vacío</p>
            <Link href="/shop" className="text-[#FF3B30] text-xs tracking-[2px] uppercase hover:underline">
              Ir al shop →
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between bg-[#111] border border-white/5 p-6 rounded-sm"
              >
                {/* Imagen placeholder */}
                <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-sm">
                  <span className="text-white/10 text-xl font-bold">
                    {item.brand.slice(0, 2)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 px-6">
                  <p className="text-white/30 text-[9px] tracking-[2px] uppercase mb-1">{item.brand}</p>
                  <p className="text-white text-sm tracking-wide">{item.title}</p>
                  <p className="text-[#FF3B30] text-sm font-medium mt-1">{item.price}</p>
                </div>

                {/* Cantidad */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 border border-white/10 text-white/40 hover:border-[#FF3B30] hover:text-[#FF3B30] transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 border border-white/10 text-white/40 hover:border-[#FF3B30] hover:text-[#FF3B30] transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-6 text-white/20 hover:text-[#FF3B30] transition-colors"
                >
                  <IconTrash size={16} />
                </button>
              </motion.div>
            ))}

            {/* Total y checkout */}
            <div className="mt-8 border-t border-white/5 pt-8 flex items-center justify-between">
              <div>
                <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-1">Total</p>
                <p className="text-white text-2xl font-bold">
                  ${total.toLocaleString("es-CO")}
                </p>
              </div>
              <button className="bg-[#FF3B30] text-white px-12 py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors">
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}