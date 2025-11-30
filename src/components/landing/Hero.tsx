"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Star, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("@/components/Particles"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-bg-body via-bg-surface to-bg-body">
      {/* Background animado com partículas */}
      <div className="absolute inset-0">
        <Particles
          className="h-full w-full"
          particleCount={150}
          particleColors={["#ffc107", "#ffd54f", "#ffffff"]}
          speed={0.3}
          particleBaseSize={1.5}
          sizeRandomness={0.8}
          cameraDistance={100}
          particleSpread={200}
          alphaParticles
        />
      </div>

      {/* Efeito de grade animada no fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-10" />

      {/* Efeito de luz dourada */}
      <div className="-translate-x-1/2 absolute top-1/4 left-1/2 h-[800px] w-[800px] animate-pulse rounded-full bg-color-primary/20 blur-[120px]" />

      <div className="container z-10 mx-auto px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Conteúdo Textual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-color bg-bg-surface-light px-4 py-2"
            >
              <TrendingUp className="h-4 w-4 text-color-primary" />
              <span className="text-sm text-text-secondary">A Plataforma #1 de Avaliação de Filmes e Séries</span>
            </motion.div>

            <h1 className="mb-6 font-bold text-5xl leading-tight md:text-7xl">
              <span className="text-text-primary">Sua Opinião</span>
              <br />
              <span className="bg-gradient-to-r from-color-primary via-yellow-400 to-color-primary-hover bg-clip-text text-transparent">
                Vale Ouro
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-text-secondary text-xl">
              Descubra, avalie e compartilhe suas críticas sobre os melhores filmes e séries. Junte-se a uma comunidade
              apaixonada por cinema.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "var(--glow-primary)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-color-primary to-color-primary-hover px-8 py-4 font-semibold text-color-on-primary text-lg transition-all hover:shadow-[0_0_30px_rgba(255,193,7,0.6)]"
              >
                <Play className="h-5 w-5" fill="currentColor" />
                Começar Agora
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-border-color bg-bg-surface-light px-8 py-4 font-semibold text-lg text-text-primary transition-all hover:bg-bg-surface"
              >
                <Star className="h-5 w-5 text-color-primary" />
                Explorar Críticas
              </motion.button>
            </div>

            {/* Estatísticas */}

            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
            >
              <div className="text-center lg:text-left">
                <div className="font-bold text-3xl text-color-primary">50K+</div>
                <div className="text-sm text-text-secondary">Avaliações</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-bold text-3xl text-color-primary">15K+</div>
                <div className="text-sm text-text-secondary">Usuários Ativos</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-bold text-3xl text-color-primary">8K+</div>
                <div className="text-sm text-text-secondary">Filmes & Séries</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Elemento Visual 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex-1"
          >
            <div className="relative mx-auto w-full max-w-lg">
              {/* Cards flutuantes com efeito 3D */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 h-96 w-64 rotate-6 transform rounded-2xl border border-border-color bg-gradient-to-br from-bg-surface to-bg-surface-light p-6 shadow-[var(--shadow-card)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-color-primary/20">
                    <Star className="h-6 w-6 text-color-primary" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-color-primary">9.5</div>
                    <div className="text-text-secondary text-xs">Épico!</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded-full bg-color-primary/30" />
                  <div className="h-2 w-4/5 rounded-full bg-color-primary/20" />
                  <div className="h-2 w-3/5 rounded-full bg-color-primary/10" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotateY: [0, -10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="-rotate-6 absolute bottom-0 left-0 h-96 w-64 transform rounded-2xl border border-border-color bg-gradient-to-br from-bg-surface-light to-bg-surface p-6 shadow-[var(--shadow-card)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-color-like/20">
                    <Play className="h-6 w-6 text-color-like" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-text-primary">Em Alta</div>
                    <div className="text-text-secondary text-xs">Tendências</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-16 rounded-lg bg-gradient-to-r from-color-danger/20 to-transparent" />
                  <div className="h-16 rounded-lg bg-gradient-to-r from-color-info/20 to-transparent" />
                  <div className="h-16 rounded-lg bg-gradient-to-r from-color-success/20 to-transparent" />
                </div>
              </motion.div>

              {/* Elemento central */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="relative z-10 mx-auto mt-48 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-color-primary to-color-primary-hover shadow-[0_0_60px_rgba(255,193,7,0.8)]"
              >
                <Image src="/logo-short.png" alt="CRITIX Logo" width={64} height={64} className="h-16 w-16" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="-translate-x-1/2 absolute bottom-8 left-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-color-primary pt-2">
          <div className="h-2 w-1 rounded-full bg-color-primary" />
        </div>
      </motion.div>
    </section>
  );
}
