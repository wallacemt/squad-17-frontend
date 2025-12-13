"use client";

import AppLayout from "@/components/app/AppLayout";
import { motion } from "framer-motion";
import { SearchIcon, TrendingUpIcon, ClockIcon } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold text-primary mb-2">Buscar</h1>
          <p className="text-secondary text-lg">Encontre filmes, séries e usuários</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-12"
        >
          <div className="relative">
            <SearchIcon size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busque por filmes, séries ou usuários..."
              className="w-full pl-14 pr-6 py-4 bg-surface border border-color rounded-xl text-primary-crx placeholder:text-secondary focus:outline-none focus:border-primary-crx focus:ring-2 focus:ring-primary-crx/20 transition-all"
            />
          </div>
        </motion.div>

        {!searchQuery && (
          <>
            {/* Trending Searches */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUpIcon size={24} className="text-amber-500" />
                <h2 className="text-2xl font-bold text-primary">Em Alta</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  "Oppenheimer",
                  "The Last of Us",
                  "Barbie",
                  "Succession",
                  "Dune: Part Two",
                  "The Bear",
                  "Killers of the Flower Moon",
                  "Avatar: The Way of Water",
                ].map((term, idx) => (
                  <motion.button
                    key={term}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="px-6 py-3 rounded-full bg-surface-crx border border-color hover:border-primary-crx hover:bg-primary-crx/10 text-primary transition-all"
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Searches */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-2 mb-6">
                <ClockIcon size={24} className="text-blue-500" />
                <h2 className="text-2xl font-bold text-text-primary">Buscas Recentes</h2>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Interstellar", type: "Filme", year: "2014" },
                  { title: "Breaking Bad", type: "Série", year: "2008-2013" },
                  { title: "The Matrix", type: "Filme", year: "1999" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-surface border border-color hover:border-primary-crx/50 cursor-pointer transition-all"
                  >
                    <div className="w-16 h-24 rounded-lg bg-bg-surface-light" />
                    <div className="flex-1">
                      <h3 className="text-primary font-semibold text-lg">{item.title}</h3>
                      <p className="text-secondary text-sm">
                        {item.type} • {item.year}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {!!searchQuery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-secondary text-lg">Buscando por "{searchQuery}"...</p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
