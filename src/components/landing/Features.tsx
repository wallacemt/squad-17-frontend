"use client";

import { motion } from "framer-motion";
import { Star, Users, TrendingUp, Award, Film, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Avaliações Detalhadas",
    description: "Crie críticas completas com sistema de estrelas e compartilhe sua opinião com a comunidade.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Conecte-se com outros cinéfilos, siga críticos e participe de discussões apaixonantes.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Tendências em Tempo Real",
    description: "Descubra o que está bombando agora e nunca perca os lançamentos mais aguardados.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    title: "Rankings e Conquistas",
    description: "Ganhe badges, suba no ranking e torne-se um crítico reconhecido na plataforma.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Film,
    title: "Catálogo Completo",
    description: "Acesse informações sobre milhares de filmes e séries, desde clássicos até lançamentos.",
    gradient: "from-red-500 to-rose-500",
  },
  {
    icon: MessageCircle,
    title: "Discussões Envolventes",
    description: "Participe de debates, comente avaliações e interaja com a comunidade CRITIX.",
    gradient: "from-indigo-500 to-violet-500",
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
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">
            <span className="text-text-primary">Recursos que Fazem</span>
            <span className="bg-linear-to-r from-color-primary to-color-primary-hover bg-clip-text text-transparent">
              {" "}
              a Diferença
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary text-xl">
            Tudo o que você precisa para se tornar um crítico de cinema completo
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
                <div className="h-full rounded-2xl border border-border-color bg-bg-surface p-8 transition-all duration-300 hover:border-color-primary/50 hover:shadow-[0_0_30px_rgba(255,193,7,0.2)]">
                  {/* Ícone com gradiente */}
                  <div
                    className={`h-16 w-16 bg-linear-to-br ${feature.gradient} mb-6 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="mb-3 font-bold text-2xl text-text-primary">{feature.title}</h3>

                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>

                  {/* Linha decorativa animada */}
                  <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-color-red to-transparent transition-all duration-500 group-hover:w-full" />
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
