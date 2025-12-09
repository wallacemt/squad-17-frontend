"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-bg-body py-32">
      {/* Background com gradiente radial */}

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          {/* Card principal do CTA */}
          <div className="group relative">
            {/* Brilho animado de fundo */}
            <div className="-inset-1 absolute rounded-3xl bg-gradient-to-r from-primary/20 via-yellow-400/40 to-primary-hover-crx/40 opacity-50 blur-xl transition duration-1000 group-hover:opacity-75" />

            <div className="relative rounded-3xl border border-border-color bg-gradient-to-br from-bg-surface to-bg-surface-light p-12 text-center md:p-16">
              {/* Badge superior */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-crx/30 bg-primary-crx/10 px-4 py-2"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-crx" />
                <span className="font-semibold text-shadow-amber-50 text-sm">Cadastro 100% gratuito</span>
              </motion.div>

              {/* Título principal */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mb-6 font-bold text-4xl leading-tight md:text-6xl"
              >
                <span className="text-text-primary">Comece agora. </span>
                <br />
                <span className="bg-gradient-to-r from-primary-crx via-yellow-400 to-primary-hover-crx bg-clip-text text-transparent">
                  O próximo grande review
                </span>
                <br />
                <span className="text-text-primary">pode ser o seu</span>
              </motion.h2>

              {/* Descrição */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mx-auto mb-10 max-w-2xl text-text-secondary text-xl"
              >
                Entre para uma comunidade apaixonada por cinema. Sem anúncios, sem spam, só você e sua paixão por filmes
                e séries. ✨
              </motion.p>

              {/* Botões de ação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col justify-center gap-4 sm:flex-row"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 193, 7, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary-crx to-primary-hover-crx px-10 py-5 font-bold text-lg shadow-[0_0_20px_rgba(255,193,7,0.4)] cursor-pointer transition-all hover:shadow-[0_0_40px_rgba(255,193,7,0.6)] text-text-primary"
                  onClick={() => router.push("/auth?mode=login")}
                >
                  Começar Agora
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full border-2 border-color-primary/50 px-10 py-5 font-bold text-lg text-text-primary transition-all hover:border-color-primary hover:bg-color-primary/10 cursor-pointer"
                >
                  Explorar Plataforma
                </motion.button>
              </motion.div>

              {/* Elementos decorativos flutuantes */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-10 left-10 h-20 w-20 rounded-2xl bg-color-primary/20 blur-xl"
              />

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-color-info/20 blur-2xl"
              />
            </div>
          </div>

          {/* Informações adicionais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="h-5 w-5 text-color-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <title>Check</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sem cartão de crédito</span>
            </div>

            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="h-5 w-5 text-color-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <title>Check</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Gratuito para sempre</span>
            </div>

            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="h-5 w-5 text-color-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <title>Check</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Acesso completo</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
