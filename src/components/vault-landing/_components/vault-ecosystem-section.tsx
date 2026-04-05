"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderGradientPanel } from "./shared";

export function VaultEcosystemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <BorderGradientPanel>
          <div className="relative overflow-hidden px-6 py-7 md:px-8 md:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,193,7,0.14),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:38px_38px] opacity-25" />

            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-crx">
                  <Sparkles className="h-3.5 w-3.5" />
                  Plataforma mae
                </p>

                <h3 className="mt-2 font-display text-3xl leading-tight md:text-4xl">
                  O Critix Vault nasce do ecossistema Critix
                </h3>

                <p className="mt-2 max-w-3xl text-text-secondary">
                  O Vault organiza sua biblioteca local. O Critix expande a experiencia com descoberta, comunidade e
                  avaliacoes. Dois produtos, uma visao de cinema centrada no usuario.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary-crx/40 bg-primary-crx/10 px-6 hover:bg-primary-crx/20"
              >
                <Link href="/lending">
                  Conhecer plataforma Critix
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </BorderGradientPanel>
      </motion.div>
    </section>
  );
}
