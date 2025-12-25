import { motion } from "framer-motion";
import TrandingBanner from "./_components/tranding-banner";

export default function Feed() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <TrandingBanner />
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
  );
}
