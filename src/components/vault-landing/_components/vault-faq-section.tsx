"use client";

import { vaultFaq } from "@/components/vault-landing/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Github, Star } from "lucide-react";
import Link from "next/link";
import { BorderGradientPanel } from "./shared";

interface VaultFaqSectionProps {
  msStoreUrl: string;
  repositoryUrl: string;
}

export function VaultFaqSection({
  msStoreUrl,
  repositoryUrl,
}: VaultFaqSectionProps) {
  return (
    <section
      id="faq"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-20 pb-28 sm:px-6 lg:px-8"
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
          <Star className="h-3.5 w-3.5" />
          FAQ rapido
        </Badge>
        <h2 className="font-display text-4xl md:text-6xl">
          Duvidas frequentes
        </h2>
      </motion.div>

      <div className="grid gap-4">
        {vaultFaq.map((item, index) => (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <BorderGradientPanel>
              <div className="space-y-3 px-6 py-6">
                <p className="text-lg font-semibold">{item.question}</p>
                <p className="text-text-secondary">{item.answer}</p>
              </div>
            </BorderGradientPanel>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mt-10"
      >
        <BorderGradientPanel>
          <div className="grid gap-5 px-6 py-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-text-muted text-sm uppercase tracking-[0.18em]">
                Pronto para testar
              </p>
              <h3 className="mt-2 font-display text-3xl">
                Leve sua biblioteca local para outro nivel
              </h3>
              <p className="mt-2 text-text-secondary">
                Comece agora pela Microsoft Store e acompanhe as proximas
                versoes na integra com GitHub.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-primary-crx text-on-primary-crx hover:bg-primary-hover-crx"
              >
                <a href={msStoreUrl} target="_blank" rel="noreferrer">
                  Baixar app
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary-crx/40 bg-primary-crx/10 hover:bg-primary-crx/20"
              >
                <Link href="/critix-vault/polices-terms">Polices & Terms</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/20 bg-black/20 hover:bg-black/35"
              >
                <a href={repositoryUrl} target="_blank" rel="noreferrer">
                  Ver codigo
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </BorderGradientPanel>
      </motion.div>
    </section>
  );
}
