"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al registrarse");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/shop");
    } catch (err: any) {
      setError(err.message);
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
          <a href="/" className="text-white text-2xl font-bold tracking-[4px] uppercase">
            CURB CO.
          </a>
          <p className="text-white/20 text-[10px] tracking-[3px] uppercase mt-2">
            From the Curb Up.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/30 text-[10px] tracking-[2px] uppercase">Nombre</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#FF3B30] transition-colors"
                placeholder="Mario"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/30 text-[10px] tracking-[2px] uppercase">Apellido</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#FF3B30] transition-colors"
                placeholder="Arcila"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/30 text-[10px] tracking-[2px] uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#FF3B30] transition-colors"
              placeholder="mario@curbco.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/30 text-[10px] tracking-[2px] uppercase">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#FF3B30] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[#FF3B30] text-[10px] tracking-[1px]">{error}</p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-[#FF3B30] text-white py-4 text-xs tracking-[3px] uppercase hover:bg-[#cc2f26] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <p className="text-center text-white/20 text-[10px] tracking-[1px] mt-4">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-[#FF3B30] hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </motion.div>
    </main>
  );
}