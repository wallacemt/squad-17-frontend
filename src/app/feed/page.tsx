"use client";

import AppLayout from "@/components/app/AppLayout";
import { motion } from "framer-motion";
import { TrendingUpIcon, ClockIcon, StarIcon, UsersIcon } from "lucide-react";

export default function FeedPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold text-primary mb-2">Feed</h1>
          <p className="text-secondary text-lg">Acompanhe as últimas avaliações e discussões da comunidade</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: TrendingUpIcon, label: "Em Alta", value: "247", color: "text-amber-500" },
            { icon: ClockIcon, label: "Recentes", value: "1.2K", color: "text-blue-500" },
            { icon: StarIcon, label: "Melhores", value: "89", color: "text-yellow-500" },
            { icon: UsersIcon, label: "Seguindo", value: "156", color: "text-purple-500" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface border border-border-color rounded-xl p-6 hover:border-primary-crx/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-surface-light ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-secondary text-sm">{stat.label}</p>
                  <p className="text-primary text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Area - Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-surface border border-border-color rounded-xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-crx to-primary-hover-crx" />
                <div className="flex-1">
                  <div className="h-4 bg-surface-light-crx rounded w-32 mb-2" />
                  <div className="h-3 bg-surface-light-crx rounded w-24" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-surface-light-crx rounded w-full" />
                <div className="h-4 bg-surface-light-crx rounded w-5/6" />
                <div className="h-4 bg-surface-light-crx rounded w-4/6" />
              </div>
              <div className="mt-6 flex gap-4">
                <div className="h-10 bg-surface-light-crx rounded-lg flex-1" />
                <div className="h-10 bg-surface-light-crx rounded-lg flex-1" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-surface-crx border border-color rounded-xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <div className="flex-1">
                  <div className="h-4 bg-surface-light-crx rounded w-40 mb-2" />
                  <div className="h-3 bg-surface-light-crx rounded w-28" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-surface-light-crx rounded w-full" />
                <div className="h-4 bg-surface-light-crx rounded w-3/4" />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-surface-crx border border-color rounded-xl p-6"
            >
              <h3 className="font-semibold text-primary mb-4">Tendências</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-light-crx" />
                    <div className="flex-1">
                      <div className="h-3 bg-surface-light-crx rounded w-full mb-2" />
                      <div className="h-2 bg-surface-light-crx rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-surface-crx border border-color rounded-xl p-6"
            >
              <h3 className="font-semibold text-primary mb-4">Sugeridos</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-light-crx" />
                    <div className="flex-1">
                      <div className="h-3 bg-surface-light-crx rounded w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
