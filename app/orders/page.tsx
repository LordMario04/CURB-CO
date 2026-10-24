"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/lib/nav";

const API = "http://localhost:8081";

type Order = {
  id: number;
  reference: string;
  status: "PENDING" | "PAID" | "REJECTED" | string;
  totalCents: number;
  createdAt: string;
};

function formatPrice(totalCents: number) {
  return (totalCents / 100).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStatus(status: string) {
  switch (status) {
    case "PAID":
      return {
        label: "Pagado",
        className: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
      };
    case "REJECTED":
      return {
        label: "Rechazado",
        className: "text-[#FF3B30] border-[#FF3B30]/20 bg-[#FF3B30]/5",
      };
    case "PENDING":
      return {
        label: "Pendiente",
        className: "text-amber-400 border-amber-400/20 bg-amber-400/5",
      };
    default:
      return {
        label: status,
        className: "text-white/50 border-white/10 bg-white/5",
      };
  }
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login?next=/orders");
        return;
      }

      try {
        const response = await fetch(`${API}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          router.replace("/login?next=/orders");
          return;
        }

        if (!response.ok) {
          throw new Error("No se pudieron cargar tus pedidos.");
        }

        const data: Order[] = await response.json();

        if (!cancelled) {
          setOrders(data);
        }
      } catch {
        if (!cancelled) {
          setError("No pudimos conectar con el servidor. Intenta nuevamente.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="mx-auto max-w-5xl px-6 pb-20 pt-32">
        <div className="mb-12">
          <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[#FF3B30]">
            Curb Co.
          </p>

          <h1 className="text-4xl uppercase tracking-widest text-white md:text-5xl">
            Mis pedidos
          </h1>

          <p className="mt-4 text-sm text-white/40">
            Consulta tus compras y el estado de cada pedido.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center text-xs uppercase tracking-[3px] text-white/40">
            Cargando tus pedidos...
          </div>
        ) : error ? (
          <div className="border border-[#FF3B30]/20 bg-[#111] p-8 text-center">
            <p className="text-sm text-[#FF3B30]">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 text-xs uppercase tracking-widest text-white hover:text-[#FF3B30]"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center gap-5 border border-white/5 bg-[#111] px-6 py-20 text-center">
            <p className="text-sm uppercase tracking-[2px] text-white/50">
              Aún no tienes pedidos
            </p>

            <Link
              href="/shop"
              className="bg-[#FF3B30] px-8 py-4 text-xs uppercase tracking-[2px] text-white transition-colors hover:bg-[#cc2f26]"
            >
              Explorar colección
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="mb-2 text-[10px] uppercase tracking-[2px] text-white/30">
              {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
            </p>

            {orders.map((order, index) => {
              const status = getStatus(order.status);

              return (
                <motion.article
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="border border-white/5 bg-[#111] p-5 transition-colors hover:border-white/10 md:p-7"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <p className="mb-2 text-[9px] uppercase tracking-[2px] text-white/30">
                        Referencia del pedido
                      </p>

                      <p className="break-all text-sm tracking-wider text-white md:text-base">
                        {order.reference}
                      </p>

                      <p className="mt-3 text-xs text-white/40">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
                      <div>
                        <p className="mb-2 text-[9px] uppercase tracking-[2px] text-white/30">
                          Estado
                        </p>

                        <span
                          className={`inline-block border px-3 py-2 text-[10px] uppercase tracking-widest ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="mb-2 text-[9px] uppercase tracking-[2px] text-white/30">
                          Total
                        </p>

                        <p className="text-lg font-medium text-white">
                          {formatPrice(order.totalCents)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-4">
                    <Link
                      href={`/checkout/${order.reference}`}
                      className="text-[10px] uppercase tracking-[2px] text-[#FF3B30] transition-colors hover:text-white"
                    >
                      Ver pedido →
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[2px] text-white/40 transition-colors hover:text-[#FF3B30]"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </main>
  );
}
