"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GradientBlinds from "@/components/ui/blocks/background/GradientBlinds/GradientBlinds";
import SpotlightCard from "@/components/ui/blocks/elements/SpotlightCard/SpotlightCard";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { ChevronDown, Download, Monitor, WandSparkles } from "lucide-react";
import { BorderGradientPanel } from "./shared";

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
      className="relative mx-auto flex min-h-screen max-w-7xl scroll-mt-24 items-center px-4 pt-24 pb-14 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10">
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

      <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="space-y-8"
        >
          <Badge
            className="rounded-full border-primary-crx/40 bg-primary-crx/15 px-4 py-1 text-primary-crx"
            variant="outline"
          >
            <WandSparkles className="h-3.5 w-3.5" />
            Sua biblioteca local com visual de streaming
          </Badge>

          <div className="space-y-5">
            <h1 className="font-display text-5xl leading-tight md:text-7xl">
              Organize, explore e assista
              <span className="block bg-linear-to-r from-primary-crx via-yellow-300 to-[#ff8a00] bg-clip-text text-transparent">
                sem renomear seus arquivos
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-text-secondary md:text-xl">
              O Critix Vault transforma suas pastas em uma biblioteca elegante, rapida e pratica. Filmes, series,
              temporadas e episodios em uma experiencia desktop com cara de plataforma premium.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary-crx px-7 text-on-primary-crx hover:bg-primary-hover-crx"
            >
              <a href={msStoreUrl} target="_blank" rel="noreferrer">
                <Monitor className="h-4 w-4" />
                Baixar pela Microsoft Store
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-black/30 px-7 hover:bg-black/40"
            >
              <a href="#download">
                <Download className="h-4 w-4" />
                Ver opcoes de download
              </a>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
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
                  <p className="text-text-muted text-xs uppercase tracking-[0.2em]">API GitHub</p>
                  <p className="mt-1 text-lg font-semibold">Atualizada {fetchedAtLabel}</p>
                </div>
              </BorderGradientPanel>
            </SpotlightCard>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative min-h-[420px]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-8 left-0 w-[72%]"
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
            className="absolute top-40 right-0 w-[58%]"
          >
            <BorderGradientPanel>
              <div className="overflow-hidden rounded-[calc(1.5rem-1px)]">
                <OptimizedImage
                  src="/images/vault/movie-screen.png"
                  alt="Preview detalhes de filme"
                  width={1200}
                  height={700}
                  className="h-48 w-full object-cover"
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
            className="absolute bottom-0 left-10 w-[64%]"
          >
            <BorderGradientPanel>
              <div className="overflow-hidden rounded-[calc(1.5rem-1px)]">
                <OptimizedImage
                  src="/images/vault/config.png"
                  alt="Preview configuracoes"
                  width={1200}
                  height={700}
                  className="h-44 w-full object-cover"
                  fallbackSrc="/images/placeholder-image-carrousel.webp"
                />
              </div>
            </BorderGradientPanel>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#recursos"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/20 p-2 text-text-secondary"
        aria-label="Ir para secao de recursos"
      >
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
