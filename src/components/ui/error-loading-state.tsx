"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function ErrorLoadingState() {
  return (
    <div className="fixed inset-0 bg-bg-body/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-bg-surface border border-border-color rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Loader2 className="w-12 h-12 text-primary-crx" />
        </motion.div>
        <p className="text-text-secondary font-semibold">Recuperando...</p>
      </motion.div>
    </div>
  );
}
