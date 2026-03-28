"use client";

import { motion } from "framer-motion";
import { Play, Star, TrendingUp, Home } from "lucide-react";
import type { TMDBMedia } from "@/types/tmdb";
import { useState } from "react";
import { getGenreNames, getImageUrl, getTitle } from "@/utils/tmdbUtils";
import GradientBlinds from "../../ui/blocks/background/GradientBlinds/GradientBlinds";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { OptimizedImage } from "@/components/ui/optimized-image";

function getRandomMedia(medias: TMDBMedia[]) {
  if (!medias || medias.length === 0) {
    return [];
  }
  const shuffledArray = [...medias].sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, 2);
}

export default function Hero({ trending }: { trending: TMDBMedia[] }) {
  const [sortMedia, _setSortMedia] = useState<TMDBMedia[]>(getRandomMedia(trending));
  const { user } = useAuthContext();

  const router = useRouter();
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-bg-body via-bg-surface to-bg-body">
      {/* Background animado com partículas */}
      <div className="absolute inset-0 ">
        <GradientBlinds
          gradientColors={["#2c2c2c", "#5227FF", "#2979ff"]}
          angle={40}
          noise={0.12}
          blindCount={14}
          blindMinWidth={50}
          spotlightRadius={0.45}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={1}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      <div className="container mx-auto px-6 py-12 mt-12 ">
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
              <TrendingUp className="h-4 w-4 text-primary-crx" />
              <span className="text-sm text-text-secondary">A Plataforma #1 de Avaliação de Filmes e Séries</span>
            </motion.div>

            <h1 className="mb-6 font-display font-bold text-5xl leading-tight md:text-8xl">
              <span className="text-text-primary">Sua opinião,</span>
              <br />
              <span className="bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx bg-clip-text text-transparent">
                amplificada
              </span>
            </h1>

            <p className="mb-8  max-w-2xl text-text-secondary text-xl">
              A nova forma de descobrir, avaliar e discutir filmes e séries — com precisão, comunidade e tecnologia.
              Transforme sua opinião em influência.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {user ? (
                // Usuário autenticado - botão para Home
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "var(--glow-primary)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-primary-hover-crx/60 px-8 py-4 font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(255,193,7,0.6)] z-4 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  <Home className="h-5 w-5" />
                  Ir para Home
                </motion.button>
              ) : (
                // Usuário não autenticado - botão para Login
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "var(--glow-primary)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-primary-hover-crx/60 px-8 py-4 font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(255,193,7,0.6)] z-4 cursor-pointer"
                  onClick={() => router.push("/auth?mode=login")}
                >
                  <Play className="h-5 w-5" fill="currentColor" />
                  Começar Agora
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-border-color bg-purple-900/90 px-8 py-4 font-semibold text-lg text-text-primary transition-all hover:bg-purple-700/90 z-4"
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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex-1"
          >
            <div className="relative mx-auto w-full max-w-lg">
              {/* Cards flutuantes com efeito 3D */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute  2xl:-right-82  -top-36 -right-4 rotate-6  2xl:w-[25rem] 2xl:h-[36rem] h-96 w-64 transform rounded-2xl border border-border-color bg-gradient-to-br from-bg-surface to-bg-surface-light p-6 shadow-[var(--shadow-card)] opacity-30 md:opacity-100"
                style={{
                  transformStyle: "preserve-3d",
                }}
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
                  <div className="h-2 w-full rounded-full bg-primary-crx/50" />
                  <div className="h-2 w-4/5 rounded-full bg-primary-crx/40" />
                  <div className="h-2 w-3/5 rounded-full bg-primary-crx/20" />
                </div>
                <div className="w-full h-[70%] mt-2 relative">
                  <div className="absolute w-full rounded-2xl bottom-0 p-2 bg-black/60">
                    <p className="mb-2 font-medium text-xs text-white/80">{getGenreNames(sortMedia?.[1]?.genre_ids)}</p>
                    <h3 className="mb-3 line-clamp-2 font-bold text-sm text-white">{getTitle(sortMedia?.[1])}</h3>
                  </div>

                  <OptimizedImage
                    alt={sortMedia?.[1]?.title ?? "Media Trending"}
                    src={getImageUrl(sortMedia?.[1]?.backdrop_path ?? "", "w780")}
                    width={600}
                    height={600}
                    className="object-cover rounded-2xl w-full h-full"
                    fallbackSrc="/images/placeholder-movies.webp"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotateY: [0, -10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="-rotate-6 absolute 2xl:-bottom-36 -bottom-18 left-12  md:-left-6 2xl:w-[25rem] 2xl:h-[36rem] h-96 w-64 transform rounded-2xl border border-border-color bg-gradient-to-br from-bg-surface-light to-bg-surface p-6 shadow-[var(--shadow-card)] opacity-30 md:opacity-100"
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
                <div className="w-full h-[80%] relative ">
                  <div className="absolute rounded-2xl bottom-0 p-2 w-full bg-black/60">
                    <p className="mb-2 font-medium text-xs text-white/80">{getGenreNames(sortMedia?.[0]?.genre_ids)}</p>
                    <h3 className="mb-3 line-clamp-2 font-bold text-sm text-white">{getTitle(sortMedia?.[0])}</h3>
                  </div>

                  <OptimizedImage
                    alt={sortMedia?.[0]?.title ?? "Media Trending"}
                    src={getImageUrl(sortMedia?.[0]?.backdrop_path ?? "", "w780")}
                    width={600}
                    height={600}
                    className="object-cover rounded-2xl w-full h-full"
                    fallbackSrc="/images/placeholder-old-movies.webp"
                  />
                </div>
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
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-primary-crx pt-2">
          <div className="h-2 w-1 rounded-full bg-primary-crx" />
        </div>
      </motion.div>
    </section>
  );
}
