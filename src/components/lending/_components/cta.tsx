"use client";

import { useAuthContext } from "@/context/authContext";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const CinemaCore3D = dynamic(
  () => import("./cta-cinema-core").then((mod) => mod.CinemaCore3D),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-yellow-100 via-amber-400 to-orange-500 shadow-[0_0_55px_rgba(255,193,7,0.55)]" />
      </div>
    ),
  }
);

export default function CTA() {
  const router = useRouter();
  const { user } = useAuthContext();
  if (user) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-bg-body py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,193,7,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border-color bg-gradient-to-br from-[#0f0f10] via-[#141415] to-[#111112] p-7 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,193,7,0.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,193,7,0.06),transparent_40%)]" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-crx/35 bg-primary-crx/10 px-4 py-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary-crx" />
                  <span className="text-sm font-medium text-text-secondary">
                    Sua voz no centro da conversa sobre cinema
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-4xl font-semibold leading-tight md:text-6xl"
                >
                  <span className="text-text-primary">
                    Assista, analise, influencie.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary-crx via-yellow-300 to-primary-hover-crx bg-clip-text text-transparent">
                    O proximo review memoravel pode ser o seu.
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-5 max-w-2xl text-md text-text-secondary"
                >
                  No Critix, voce transforma gosto em repertorio: publica
                  criticas com estilo, descobre novas obras e participa de uma
                  comunidade ativa de filmes e series.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary-crx to-primary-hover-crx px-8 py-4 text-base font-semibold text-on-primary shadow-[0_0_24px_rgba(255,193,7,0.28)] transition-all hover:shadow-[0_0_32px_rgba(255,193,7,0.38)]"
                    onClick={() => router.push("/auth?mode=login")}
                  >
                    Criar conta gratis
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer rounded-full border border-white/20 bg-black/25 px-8 py-4 text-base font-semibold text-text-primary transition-all hover:border-primary-crx/55 hover:bg-primary-crx/10"
                    onClick={() => router.push("/critix-vault")}
                  >
                    Explorar ecossistema Critix
                  </motion.button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-5 text-sm text-text-muted"
                >
                  Comece em minutos. Perfil gratuito, comunidade viva e
                  experiencias conectadas com o Critix Vault.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="relative mx-auto h-96 w-full max-w-[420px]"
              >
                <div className="absolute inset-0 rounded-3xl border border-white/10 bg-black/35" />
                <div className="absolute inset-4 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.15),rgba(255,193,7,0.03)_45%,transparent_72%)]">
                  <CinemaCore3D />
                </div>

                <div className="absolute right-5 bottom-5 rounded-br-lg border border-white/10 bg-black/55 px-3 py-2 text-[0.5rem] font-medium tracking-[0.14em] text-text-secondary">
                  O PROXIMO GRANDE REVIEW PODE SER SEU
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
