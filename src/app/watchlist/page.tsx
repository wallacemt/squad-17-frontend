"use client";

import AppLayout from "@/components/app/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookmarkIcon, PlayIcon,} from "lucide-react";

export default function WatchlistPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">Watchlist</h1>
          <p className="text-text-secondary text-lg">Seus filmes e séries salvos para assistir depois</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {["Todos", "Filmes", "Séries", "Para Assistir"].map((tab, idx) => (
            <Button
            variant={"ghost"}
              key={tab}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                idx === 0 ? "bg-primary-crx text-white" : "bg-surface-crx text-secondary hover:bg-surface-light-crx"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Watchlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-bg-surface border border-border-color hover:border-primary-crx/50 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-primary-crx/90 flex items-center justify-center">
                  <PlayIcon size={28} fill="white" className="text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <BookmarkIcon size={16} fill="white" className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
