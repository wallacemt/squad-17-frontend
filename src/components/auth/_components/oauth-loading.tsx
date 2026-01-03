"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Film, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function OAuthLoadingScreen() {
  const loadingMessages = [
    "Você está a um passo de fazer uma nova crítica 🎬",
    "Sua opinião no Critix tem relevância ⭐",
    "Preparando o palco para sua próxima review...",
    "A comunidade está pronta para ouvir você 👀",
    "Transformando sua opinião em impacto 🎥",
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000); // troca a cada 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-bg-body via-bg-surface to-bg-body overflow-x-hidden overflow-y-auto p-2">
      {/* Animated background particles */}
      <div className="absolute inset-0  pointer-events-none">
        {new Array(15).fill(0).map(() => {
          const uniqueId = `particle-${Math.random().toString(36).substring(2, 9)}`;
          return (
            <motion.div
              key={uniqueId}
              className="absolute w-2 h-2 bg-primary-crx/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mt-6"
      >
        <div className="bg-bg-surface/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-primary-crx/20 max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="relative  p-4 rounded-xl">
                <Image src="/images/logo-full.png" alt="Critix Logo" width={200} height={300} className="w-full" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-text-secondary mb-2"
                >
                  Sua opinião amplificada
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold mb-2"
          >
            <span className="bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx bg-clip-text text-transparent">
              Bem-vindo ao Critix
            </span>
          </motion.h1>

          {/* Loading animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex justify-center items-center gap-3 mb-4">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Film className="w-12 h-12 text-primary-crx" />
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-2 text-text-primary">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="w-5 h-5 text-primary-crx" />
              </motion.div>
              <div className="h-full flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-white text-xs text-center"
                  >
                    {loadingMessages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-2 h-2 bg-primary-crx rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            <p className="text-text-muted text-sm">Configurando sua experiência cinematográfica...</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
