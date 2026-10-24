"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/lib/nav";
import { useCartStore } from "@/store/cartStore";

const API = "http://localhost:8081";

type Order = { reference: string; status: string; totalCents: number };

export default function ResultPage() {
  const { reference } = useParams<{ reference: string }>();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(API + "/api/orders/" + reference, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data: Order) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [reference, router]);

  useEffect(() => {
    if (order && order.status === "PAID") {
      clearCart();
    }
  }, [order, clearCart]);

  let title = "";
  let message = "";
  let titleColor = "text-white";

  if (order) {
    if (order.status === "PAID") {
      title = "Pago aprobado";
      message = "Gracias por tu compra. Ya estamos preparando tu pedido.";
      titleColor = "text-white";
    } else if (order.status === "REJECTED") {
      title = "Pago rechazado";
      message = "No se pudo completar el pago. Tu carrito sigue guardado.";
      titleColor = "text-[#FF3B30]";
    } else {
      title = "Pago pendiente";
      message = "Estamos esperando la confirmación del pago.";
      titleColor = "text-white";
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="max-w-md mx-auto px-6 pt-32 pb-16">
        {loading ? (
          <p className="text-white/20 text-xs tracking-[2px] uppercase">
            Cargando...
          </p>
        ) : error || !order ? (
          <div className="flex flex-col gap-4">
            <p className="text-white/30 text-xs tracking-[3px] uppercase">
              Orden no encontrada
            </p>
            <Link
              href="/shop"
              className="text-[#FF3B30] text-xs tracking-[2px] uppercase hover:underline"
            >
              Volver al shop →
            </Link>
          </div>
        ) : (
          <div className="bg-[#111] border border-white/5 p-8">
            <h1 className={titleColor + " text-5xl tracking-widest uppercase mb-4"}>
              {title}
            </h1>
            <p className="text-white/40 text-sm mb-8">{message}</p>

            <p className="text-white/30 text-[10px] tracking-[2px] uppercase mb-1">
              Referencia
            </p>
            <p className="text-white text-sm mb-6 break-all">{order.reference}</p>

            <p className="text-white/30 text-[10px] tracking-[2px] uppercase mb-1">
              Total
            </p>
            <p className="text-white text-3xl mb-8">
              ${(order.totalCents / 100).toLocaleString("es-CO")}
            </p>

            <div className="flex flex-col gap-3">
              {order.status === "REJECTED" && (
                <Link
                  href="/cart"
                  className="w-full text-center bg-[#FF3B30] text-white py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors"
                >
                  Volver al carrito
                </Link>
              )}
              <Link
                href="/shop"
                className="w-full text-center border border-white/10 text-white/50 py-4 text-xs tracking-[3px] uppercase hover:border-white/30 transition-colors"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}