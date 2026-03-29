"use client";

import { Button } from "@/components/ui/button";
import GradientBlinds from "@/components/ui/blocks/background/GradientBlinds/GradientBlinds";
import SpotlightCard from "@/components/ui/blocks/elements/SpotlightCard/SpotlightCard";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { Download, Monitor, WandSparkles } from "lucide-react";
import { BorderGradientPanel } from "./shared";
import Link from "next/link";

interface VaultHeroSectionProps {
  msStoreUrl: string;
  latestVersion: string | null;
  hasInstallableAssets: boolean;
  fetchedAtLabel: string;
}

export function VaultHeroSection({
  msStoreUrl,
  latestVersion,
  hasInstallableAssets,
  fetchedAtLabel,
}: VaultHeroSectionProps) {
  return (
    <section
      id="visao"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-bg-body via-bg-surface to-bg-body"
    >
      <div className="absolute inset-0 ">
        <GradientBlinds
          gradientColors={["#2c2c2c", "#ffbf00", "#1f8d9f"]}
          angle={42}
          noise={0.11}
          blindCount={12}
          blindMinWidth={48}
          spotlightRadius={0.38}
          spotlightSoftness={1}
          spotlightOpacity={0.9}
          mouseDampening={0.16}
          distortAmount={0.8}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      <div className="container mx-auto px-6 py-12 mt-12 ">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left  z-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-color bg-bg-surface-light px-4 py-2"
            >
              <WandSparkles className="h-4 w-4 text-primary-crx" />
              <span className="text-sm text-text-secondary">Sua biblioteca local com visual de streaming</span>
            </motion.div>

            <h1 className="mb-6 font-display font-bold text-4xl leading-tight md:text-6xl">
              <span className="text-text-primary">Organize, explore e assista</span>
              <br />
              <span className="bg-gradient-to-r from-primary-crx via-yellow-300 to-[#ff8a00] bg-clip-text text-transparent">
                sem renomear seus arquivos
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-text-secondary text-sm">
              O Critix Vault transforma suas pastas em uma biblioteca elegante, rapida e pratica. Filmes, series,
              temporadas e episodios em uma experiencia desktop com cara de plataforma premium.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full  bg-gradient-to-r from-amber-600 to-primary-hover-crx/90 px-8 py-4 text-lg font-semibold hover:shadow-[0_0_30px_rgba(255,193,7,0.6)]"
              >
                <Link href={msStoreUrl} target="_blank" rel="noreferrer">
                  <Monitor className="h-5 w-5" />
                  Baixar pela Microsoft Store
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border border-border-color bg-bg-surface-light px-8 py-4 text-lg hover:bg-bg-surface"
              >
                <a href="#download">
                  <Download className="h-5 w-5" />
                  Ver opcoes de download
                </a>
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid gap-3 sm:grid-cols-3"
            >
              <SpotlightCard className="rounded-3xl" spotlightColor="rgba(255, 193, 7, 0.2)">
                <BorderGradientPanel>
                  <div className="px-4 py-4">
                    <p className="text-text-muted text-xs uppercase tracking-[0.2em]">Ultima versao</p>
                    <p className="mt-1 text-lg font-semibold">{latestVersion ?? "Em definicao"}</p>
                  </div>
                </BorderGradientPanel>
              </SpotlightCard>

              <SpotlightCard className="rounded-3xl" spotlightColor="rgba(0, 200, 180, 0.2)">
                <BorderGradientPanel>
                  <div className="px-4 py-4">
                    <p className="text-text-muted text-xs uppercase tracking-[0.2em]">Assets diretos</p>
                    <p className="mt-1 text-lg font-semibold">{hasInstallableAssets ? "Disponiveis" : "Em breve"}</p>
                  </div>
                </BorderGradientPanel>
              </SpotlightCard>

              <SpotlightCard className="rounded-3xl" spotlightColor="rgba(255, 141, 0, 0.2)">
                <BorderGradientPanel>
                  <div className="px-4 py-4">
                    <p className="text-text-muted text-xs uppercase tracking-[0.2em]">API GitHub att</p>
                    <p className="mt-1 text-lg font-semibold"> {fetchedAtLabel}</p>
                  </div>
                </BorderGradientPanel>
              </SpotlightCard>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex-1"
          >
            <div className="relative mx-auto w-full hidden md:block   max-w-lg min-h-[520px]">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-32 -right-4 z-20 rotate-6 md:opacity-100"
              >
                <BorderGradientPanel>
                  <div className="overflow-hidden rounded-[calc(1.5rem-1px)]">
                    <OptimizedImage
                      src="/images/vault/library-movies.png"
                      alt="Preview biblioteca de filmes"
                      width={1200}
                      height={700}
                      className="h-56 w-full object-cover"
                      fallbackSrc="/images/placeholder-movies.webp"
                    />
                  </div>
                </BorderGradientPanel>
              </motion.div>

              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{
                  duration: 5.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="absolute top-28 right-0 z-30"
              >
                <BorderGradientPanel>
                  <div className="overflow-hidden rounded-[calc(1.5rem-1px)]">
                    <OptimizedImage
                      src="/images/vault/serie-screen.png"
                      alt="Preview detalhes de filme"
                      width={1200}
                      height={700}
                      className="h-56 w-full object-cover"
                      fallbackSrc="/images/placeholder-old-movies.webp"
                    />
                  </div>
                </BorderGradientPanel>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="absolute -bottom-22 left-12 z-10 -rotate-6 "
              >
                <BorderGradientPanel>
                  <div className="overflow-hidden rounded-[calc(1.5rem-1px)]">
                    <OptimizedImage
                      src="/images/vault/library-series.png"
                      alt="Preview configuracoes"
                      width={1200}
                      height={700}
                      className="h-56 w-full object-cover"
                      fallbackSrc="/images/placeholder-image-carrousel.webp"
                    />
                  </div>
                </BorderGradientPanel>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#recursos"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Ir para secao de recursos"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-primary-crx pt-2">
          <span className="h-2 w-1 rounded-full bg-primary-crx" />
        </span>
      </motion.a>
    </section>
  );
}
