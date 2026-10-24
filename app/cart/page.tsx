"use client";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { IconTrash } from "@tabler/icons-react";
import { useCartStore } from "@/store/cartStore";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/lib/nav";

const API = "http://localhost:8081";
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function toPesos(price: string) {
  return parseInt(price.replace(/\D/g, ""), 10) || 0;
}

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } =
    useCartStore();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const list = mounted ? items : [];
  const total = list.reduce(
    (sum, item) => sum + toPesos(item.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?next=/cart");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const res = await fetch(API + "/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          items: list.map((i) => ({ productId: i.id, quantity: i.quantity })),
        }),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        router.push("/login?next=/cart");
        return;
      }

      if (!res.ok) {
        let message = "No se pudo crear la orden";
        try {
          const data = await res.json();
          if (data.message) message = data.message;
        } catch {}
        setError(message);
        return;
      }

      const order = await res.json();
      router.push("/checkout/" + order.reference);
    } catch {
      setError("No se pudo conectar con el servidor. ¿Está corriendo el backend?");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">
              Curb Co.
            </p>
            <h1 className="text-white text-5xl tracking-widest uppercase">
              Carrito
            </h1>
          </div>
          {list.length > 0 && (
            <button
              onClick={clearCart}
              className="text-white/20 text-[10px] tracking-[2px] uppercase hover:text-[#FF3B30] transition-colors"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-white/20 text-xs tracking-[3px] uppercase">
              Tu carrito está vacío
            </p>
            <Link
              href="/shop"
              className="text-[#FF3B30] text-xs tracking-[2px] uppercase hover:underline"
            >
              Ir al shop →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {list.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between bg-[#111] border border-white/5 p-6 rounded-sm"
              >
                <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-sm">
                  <span className="text-white/10 text-xl font-bold">
                    {item.brand.slice(0, 2)}
                  </span>
                </div>

                <div className="flex-1 px-6">
                  <p className="text-white/30 text-[9px] tracking-[2px] uppercase mb-1">
                    {item.brand}
                  </p>
                  <p className="text-white text-sm tracking-wide">{item.title}</p>
                  <p className="text-[#FF3B30] text-sm font-medium mt-1">
                    {item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 border border-white/10 text-white/40 hover:border-[#FF3B30] hover:text-[#FF3B30] transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-white text-sm w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 border border-white/10 text-white/40 hover:border-[#FF3B30] hover:text-[#FF3B30] transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-6 text-white/20 hover:text-[#FF3B30] transition-colors"
                >
                  <IconTrash size={16} />
                </button>
              </motion.div>
            ))}

            <div className="mt-8 border-t border-white/5 pt-8 flex items-center justify-between">
              <div>
                <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-1">
                  Total
                </p>
                <p className="text-white text-3xl">
                  ${total.toLocaleString("es-CO")}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={processing}
                className="bg-[#FF3B30] text-white px-12 py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors disabled:opacity-50"
              >
                {processing ? "Procesando..." : "Finalizar compra"}
              </button>
            </div>

            {error && (
              <p className="text-[#FF3B30] text-xs tracking-[1px] mt-4">{error}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}