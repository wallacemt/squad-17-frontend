"use client";

import AppLayout from "@/components/app/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { StarIcon, TrophyIcon, AwardIcon } from "lucide-react";

const tierRanks = [
  {
    tier: "S",
    color: "from-amber-500 to-yellow-600",
    borderColor: "border-amber-500",
    movies: ["The Shawshank Redemption", "The Godfather", "The Dark Knight"],
  },
  {
    tier: "A",
    color: "from-purple-500 to-pink-600",
    borderColor: "border-purple-500",
    movies: ["Pulp Fiction", "Fight Club", "Inception"],
  },
  {
    tier: "B",
    color: "from-blue-500 to-cyan-600",
    borderColor: "border-blue-500",
    movies: ["The Matrix", "Interstellar", "Gladiator"],
  },
  {
    tier: "C",
    color: "from-green-500 to-emerald-600",
    borderColor: "border-green-500",
    movies: ["Avatar", "Jurassic Park", "The Lion King"],
  },
  {
    tier: "D",
    color: "from-gray-500 to-slate-600",
    borderColor: "border-gray-500",
    movies: ["Transformers", "Fast & Furious", "Pirates of the Caribbean"],
  },
];

export default function TierRankPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <StarIcon size={32} className="text-amber-500" fill="currentColor" />
            <h1 className="font-display text-4xl font-bold text-primary">Tier Rank</h1>
          </div>
          <p className="text-secondary text-lg">Organize seus filmes e séries por classificação</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: TrophyIcon, label: "Total Ranqueado", value: "15", color: "text-amber-500" },
            { icon: StarIcon, label: "Média Geral", value: "8.5", color: "text-yellow-500" },
            { icon: AwardIcon, label: "Tier S", value: "3", color: "text-purple-500" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-crx border border-color rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-bg-surface-light ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-secondary text-sm">{stat.label}</p>
                  <p className="text-primary-crx text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tier List */}
        <div className="space-y-6">
          {tierRanks.map((tier, idx) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`bg-surface-crx border-2 ${tier.borderColor} rounded-xl overflow-hidden`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Tier Label */}
                <div className={`flex items-center justify-center md:w-32 p-6 bg-gradient-to-br ${tier.color}`}>
                  <span className="text-6xl font-black text-white">{tier.tier}</span>
                </div>

                {/* Movies */}
                <div className="flex-1 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tier.movies.map((movie, movieIdx) => (
                      <motion.div
                        key={movie}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.15 + movieIdx * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-bg-surface-light hover:bg-body-crx border border-color hover:border-primary-crx/50 cursor-pointer transition-all"
                      >
                        <div className="w-12 h-16 rounded-md bg-bg-body" />
                        <div className="flex-1 min-w-0">
                          <p className="text-primary font-semibold truncate">{movie}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <StarIcon size={14} fill="currentColor" className="text-amber-500" />
                            <span className="text-secondary text-sm">{(Math.random() * 2 + 8).toFixed(1)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add New Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <Button
            variant={"ghost"}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-primary-hover-crx hover:shadow-[0_0_30px_rgba(255,193,7,0.4)] text-white font-semibold transition-all">
            
            Adicionar Novo Ranqueamento
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
