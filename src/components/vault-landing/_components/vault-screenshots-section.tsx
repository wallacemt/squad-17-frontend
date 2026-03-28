"use client";

import { vaultScreenshots } from "@/components/vault-landing/content";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BorderGradientPanel } from "./shared";

export function VaultScreenshotsSection() {
  const spotlightScreenshots = vaultScreenshots.slice(0, 4);
  const foldedScreenshots = vaultScreenshots.slice(4);

  return (
    <section id="capturas" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        className="mb-12 space-y-4"
      >
        <Badge variant="outline" className="border-primary-crx/40 bg-primary-crx/10 text-primary-crx">
          <Sparkles className="h-3.5 w-3.5" />
          Capturas com dinamica e dobras
        </Badge>
        <h2 className="font-display text-4xl md:text-6xl">Visual de produto com movimento real</h2>
        <p className="max-w-3xl text-lg text-text-secondary">
          Duas galerias diferentes reforcam a proposta da landing: cards em camadas com efeito lift e uma linha de dobra
          alternada para storytelling do produto.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-4">
        {spotlightScreenshots.map((shot, index) => (
          <motion.div
            key={shot.src}
            initial={{ opacity: 0, y: 36, rotate: index % 2 === 0 ? -2 : 2 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? -1 : 1,
            }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
            className="h-full"
          >
            <BorderGradientPanel className="h-full">
              <div className="h-full overflow-hidden rounded-[calc(1.5rem-1px)]">
                <OptimizedImage
                  src={shot.src}
                  alt={shot.alt}
                  width={1200}
                  height={720}
                  className="h-52 w-full object-cover"
                  fallbackSrc="/images/placeholder-movies.webp"
                />
                <div className="space-y-2 px-4 py-4">
                  <p className="font-semibold">{shot.title}</p>
                  <p className="text-sm text-text-secondary">{shot.caption}</p>
                </div>
              </div>
            </BorderGradientPanel>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 space-y-6">
        {foldedScreenshots.map((shot, index) => {
          const isOdd = index % 2 === 1;

          return (
            <motion.article
              key={shot.src}
              initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className={cn("grid gap-5 lg:grid-cols-2", isOdd && "lg:[&>*:first-child]:order-2")}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4">
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10",
                    isOdd
                      ? "bg-[linear-gradient(135deg,rgba(255,193,7,0.22),transparent_60%)]"
                      : "bg-[linear-gradient(315deg,rgba(32,197,177,0.22),transparent_60%)]",
                  )}
                />

                <div
                  className={cn(
                    "absolute top-3 text-xs uppercase tracking-[0.24em] text-white/45",
                    isOdd ? "left-4" : "right-4",
                  )}
                >
                  Fold
                </div>

                <div
                  className={cn(
                    "-mx-2 mt-8 rounded-2xl border border-white/10 bg-black/50 p-2",
                    isOdd ? "rotate-[1.2deg]" : "-rotate-[1.2deg]",
                  )}
                >
                  <OptimizedImage
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={720}
                    className="h-64 w-full rounded-xl object-cover"
                    fallbackSrc="/images/placeholder-old-movies.webp"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <BorderGradientPanel className="w-full">
                  <div className="space-y-4 px-6 py-8">
                    <Badge variant="outline" className="border-white/20 bg-black/20 text-text-secondary">
                      Bloco {index + 1}
                    </Badge>
                    <h3 className="font-display text-3xl">{shot.title}</h3>
                    <p className="text-text-secondary">{shot.caption}</p>
                  </div>
                </BorderGradientPanel>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
