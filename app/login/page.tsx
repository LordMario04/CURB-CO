"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      router.push("/shop");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ha ocurrido un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <a
            href="/"
            className="text-white text-2xl font-bold tracking-[4px] uppercase"
          >
            CURB CO.
          </a>

          <p className="text-white/20 text-[10px] tracking-[3px] uppercase mt-2">
            From the Curb Up.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white/30 text-[10px] tracking-[2px] uppercase">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mario@curbco.com"
              className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#FF3B30] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/30 text-[10px] tracking-[2px] uppercase">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#FF3B30] transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#FF3B30] text-[10px] tracking-[1px]">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#FF3B30] text-white py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>

          <p className="text-center text-white/20 text-[10px] tracking-[1px] mt-4">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-[#FF3B30] hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </motion.div>
    </main>
  );
}