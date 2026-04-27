"use client";

import {
  vaultFeatureBullets,
  vaultHighlights,
  vaultSteps,
} from "@/components/vault-landing/content";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SpotlightCard from "@/components/ui/blocks/elements/SpotlightCard/SpotlightCard";
import { motion } from "framer-motion";
import { Check, Layers, Star } from "lucide-react";
import { BorderGradientPanel } from "./shared";

export function VaultFeaturesSection() {
  return (
    <section
      id="recursos"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        className="mb-12 space-y-4"
      >
        <Badge
          variant="outline"
          className="border-primary-crx/40 bg-primary-crx/10 text-primary-crx"
        >
          <Layers className="h-3.5 w-3.5" />
          Recursos e experiencia
        </Badge>
        <h2 className="font-display text-4xl md:text-6xl">
          Tudo o que voce precisa para sua biblioteca pessoal
        </h2>
        <p className="max-w-3xl text-lg text-text-secondary">
          A landing combina o design system do Critix com um visual editorial de
          alto impacto, incluindo blocos de conteudo, cards de destaque e
          animações com profundidade.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <BorderGradientPanel>
          <div className="space-y-6 px-6 py-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary-crx" />
              <p className="text-lg font-semibold">Capacidades principais</p>
            </div>

            <ul className="space-y-3">
              {vaultFeatureBullets.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-crx/20 text-primary-crx">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
              <p className="font-semibold">Fluxo rapido para comecar</p>
              <div className="mt-3 space-y-2">
                {vaultSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-crx/20 text-primary-crx">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BorderGradientPanel>

        <div className="grid gap-4 sm:grid-cols-2">
          {vaultHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <SpotlightCard
                className="h-full rounded-xl"
                spotlightColor="rgba(255, 255, 255, 0.18)"
              >
                <Card className="h-full border-white/10 bg-bg-surface/80 shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-text-secondary">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
