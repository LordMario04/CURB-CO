"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/lib/nav";

const API = "http://localhost:8081";

type Order = { reference: string; status: string; totalCents: number };

export default function PayPage() {
  const { reference } = useParams<{ reference: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?next=/cart");
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
        if (data.status !== "PENDING") {
          router.replace("/checkout/" + reference + "/resultado");
          return;
        }
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No encontramos esta orden.");
        setLoading(false);
      });
  }, [reference, router]);

  const pay = async (approved: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?next=/cart");
      return;
    }

    setPaying(true);
    setError("");

    try {
      const res = await fetch(
        API + "/api/payments/mock/" + reference + "?approved=" + approved,
        { method: "POST", headers: { Authorization: "Bearer " + token } }
      );
      if (!res.ok && res.status !== 409) {
        setError("No se pudo procesar el pago.");
        setPaying(false);
        return;
      }
      router.push("/checkout/" + reference + "/resultado");
    } catch {
      setError("No se pudo conectar con el servidor.");
      setPaying(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <FloatingNav navItems={navItems} />

      <div className="max-w-md mx-auto px-6 pt-32 pb-16">
        <p className="text-[#FF3B30] text-[10px] tracking-[3px] uppercase mb-2">
          Curb Co.
        </p>
        <h1 className="text-white text-5xl tracking-widest uppercase mb-8">
          Pago
        </h1>

        <div className="border border-[#FF3B30]/30 bg-[#FF3B30]/5 px-4 py-3 mb-8">
          <p className="text-[#FF3B30] text-[10px] tracking-[2px] uppercase">
            Pasarela simulada · solo desarrollo
          </p>
        </div>

        {loading ? (
          <p className="text-white/20 text-xs tracking-[2px] uppercase">
            Cargando orden...
          </p>
        ) : order ? (
          <div className="bg-[#111] border border-white/5 p-8">
            <p className="text-white/30 text-[10px] tracking-[2px] uppercase mb-1">
              Referencia
            </p>
            <p className="text-white text-sm tracking-wide mb-6 break-all">
              {order.reference}
            </p>

            <p className="text-white/30 text-[10px] tracking-[2px] uppercase mb-1">
              Total a pagar
            </p>
            <p className="text-white text-4xl mb-8">
              ${(order.totalCents / 100).toLocaleString("es-CO")}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => pay(true)}
                disabled={paying}
                className="w-full bg-[#FF3B30] text-white py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors disabled:opacity-50"
              >
                Aprobar pago
              </button>
              <button
                onClick={() => pay(false)}
                disabled={paying}
                className="w-full border border-white/10 text-white/50 py-4 text-xs tracking-[3px] uppercase hover:border-white/30 transition-colors disabled:opacity-50"
              >
                Rechazar pago
              </button>
            </div>
          </div>
        ) : null}

        {error && (
          <p className="text-[#FF3B30] text-xs tracking-[1px] mt-4">{error}</p>
        )}
      </div>
    </main>
  );
}