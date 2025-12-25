"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Database, Brain, Shield, Code } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "IA de Recomendação",
    description: "Algoritmos inteligentes que aprendem seu gosto e sugerem o próximo filme perfeito para você.",
    gradient: "from-purple-500 to-pink-500",
    tech: true,
  },
  {
    icon: Zap,
    title: "Tempo Real",
    description: "Atualizações instantâneas de tendências, reviews e discussões. Tudo acontecendo agora.",
    gradient: "from-yellow-500 to-orange-500",
    tech: true,
  },
  {
    icon: Database,
    title: "Big Data Analytics",
    description: "Insights poderosos baseados em milhões de avaliações. Dados que contam histórias.",
    gradient: "from-blue-500 to-cyan-500",
    tech: true,
  },
  {
    icon: Shield,
    title: "Autenticidade Verificada",
    description: "Sistema de validação que garante reviews reais de pessoas reais. Zero fake reviews.",
    gradient: "from-green-500 to-emerald-500",
    tech: true,
  },
  {
    icon: Sparkles,
    title: "Score Inteligente",
    description: "Não é só uma nota. É uma análise completa que considera múltiplos fatores e contextos.",
    gradient: "from-indigo-500 to-violet-500",
    tech: true,
  },
  {
    icon: Code,
    title: "API Aberta",
    description: "Integre nossos dados em suas aplicações. Tecnologia aberta para a comunidade dev.",
    gradient: "from-red-500 to-rose-500",
    tech: true,
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-bg-body py-24">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-color-primary blur-[100px]" />
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-color-info blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-crx/30 bg-primary-crx/10 px-4 py-2"
          >
            <Code className="h-4 w-4 text-primary-crx" />
            <span className="font-mono text-primary-crx text-sm">{"<TECH_DRIVEN />"}</span>
          </motion.div>
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">
            <span className="text-text-primary">Críticas mais inteligentes,</span>
            <br />
            <span className="bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx bg-clip-text text-transparent">
              não apenas mais uma nota
            </span>
          </h2>
          <p className="mx-auto max-w-2xl font-mono text-text-secondary/80 text-lg">
            Tecnologia de ponta encontra paixão por cinema. Cada feature foi construída para elevar sua experiência.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-border-color bg-bg-surface p-8 transition-all duration-300 hover:border-primary-crx/50 hover:shadow-[0_0_30px_rgba(255,193,7,0.15)]">
                  {/* Grid tech pattern background */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "linear-gradient(#ffc107 1px, transparent 1px), linear-gradient(90deg, #ffc107 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Ícone com gradiente e tech border */}
                  <div className="relative mb-6">
                    <div
                      className={`relative z-10 h-16 w-16 bg-linear-to-br ${feature.gradient} flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute top-0 left-0 h-16 w-16 animate-pulse rounded-2xl bg-primary-crx/20 blur-xl" />
                  </div>

                  <h3 className="mb-3 font-bold text-2xl text-text-primary transition-colors group-hover:text-primary-crx">
                    {feature.title}
                  </h3>

                  <p className="text-text-secondary/90 leading-relaxed">{feature.description}</p>

                  {/* Tech decoration */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-1 w-full max-w-[80px] rounded-full bg-gradient-to-r from-primary-crx to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    <div className="font-mono text-primary-crx/50 text-xs opacity-0 transition-all duration-500 group-hover:opacity-100">
                      {"// ACTIVE"}
                    </div>
                  </div>
                </div>

                {/* Efeito de brilho no hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-color-primary/0 to-color-primary/0 transition-all duration-300 group-hover:from-color-primary/5 group-hover:to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
