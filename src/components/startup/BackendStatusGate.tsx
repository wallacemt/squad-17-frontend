"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Film, Wifi, WifiOff, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { baseUrl } from "@/services/api";

interface BackendStatusGateProps {
  children: React.ReactNode;
}

export default function BackendStatusGate({
  children,
}: BackendStatusGateProps) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  const statusUrl =`${baseUrl}/status`

  useEffect(() => {
    let mounted = true;

    const getErrorMessage = (err: unknown): string | null => {
      if (!(err instanceof Error)) {
        return "Não foi possível conectar ao servidor";
      }

      if (err.name === "AbortError") {
        return null;
      }

      if (err.message.includes("Failed to fetch")) {
        return "Servidor indisponível. Verifique sua conexão com a internet.";
      }

      if (err.message.includes("NetworkError")) {
        return "Erro de rede. Verifique sua conexão.";
      }

      return err.message;
    };

    const handleError = (err: unknown, attemptNumber: number) => {
      if (!mounted) {
        return;
      }

      const errorMessage = getErrorMessage(err);
      if (!errorMessage) {
        return;
      }

      setReady(false);
      setError(errorMessage);
      setLoading(false);

      // Retry with exponential backoff up to 6 attempts
      if (attemptNumber < 5) {
        const delay = Math.min(30_000, 1000 * 2 ** attemptNumber);
        setTimeout(() => tryPing(attemptNumber + 1), delay);
      }
    };

    const tryPing = async (attemptNumber = 0) => {
      if (!mounted) {
        return;
      }
      setAttempt(attemptNumber);
      setError(null);

      // Abort previous
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        setLoading(true);
        const res = await fetch(statusUrl, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        if (!mounted) {
          return;
        }
        if (res.ok) {
          setReady(true);
          setError(null);
          setLoading(false);
          return;
        }
        throw new Error(`Servidor retornou status ${res.status}`);
      } catch (err: unknown) {
        handleError(err, attemptNumber);
      }
    };

    tryPing(0);

    return () => {
      mounted = false;
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [statusUrl]);

  const handleRetry = () => {
    setError(null);
    setReady(false);
    setLoading(true);
    if (abortRef.current) {
      abortRef.current.abort();
    }

    location.reload();
  };

  if (ready) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-body via-bg-surface to-bg-body p-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {new Array(25).fill(0).map(() => {
          const uniqueId = `particle-${Math.random().toString(36).substring(2, 9)}`;
          return (
            <motion.div
              key={uniqueId}
              className="absolute w-2 h-2 bg-primary-crx/80 rounded-full"
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 2400,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * Math.random()],
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
        className="max-w-lg w-full text-center relative z-10"
      >
        <div className="bg-bg-surface/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-primary-crx/20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="relative  p-4 rounded-xl">
                <Image
                  src="/images/logo-full.png"
                  alt="Critix Logo"
                  width={200}
                  height={300}
                  className="w-full"
                />
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

          <AnimatePresence mode="wait">
            {loading === true && error === null ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Cinema themed loading animation */}
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
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Wifi className="w-5 h-5 text-primary-crx" />
                  </motion.div>
                  <span className="text-lg font-medium">
                    Conectando ao servidor...
                  </span>
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

                {attempt > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-text-secondary text-sm"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Tentativa {attempt + 1} de 6...</span>
                  </motion.div>
                ) : null}

                <p className="text-text-muted text-sm">
                  Preparando a experiência cinematográfica perfeita
                </p>
              </motion.div>
            ) : null}

            {error !== null ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Error icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="absolute inset-0 bg-color-danger/20 rounded-full blur-xl"
                    />
                    <div className="relative bg-color-danger/10 p-4 rounded-full">
                      <WifiOff className="w-12 h-12 text-color-danger" />
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Conexão Interrompida
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {error}
                  </p>
                </div>

                {/* Helpful tips */}
                <div className="bg-bg-surface-light/50 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary-crx mt-0.5 flex-shrink-0" />
                    <p className="text-text-secondary text-sm">
                      <strong className="text-text-primary">Dica:</strong>{" "}
                      Verifique se:
                    </p>
                  </div>
                  <ul className="text-text-secondary text-sm space-y-1 ml-6 list-disc">
                    <li>Sua conexão com a internet está ativa</li>
                    <li>Seu firewall não está bloqueando a conexão</li>
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button
                    onClick={handleRetry}
                    className="bg-gradient-to-r from-primary-crx to-primary-hover-crx text-on-primary-crx font-semibold hover:shadow-[0_0_20px_rgba(255,193,7,0.4)] transition-all"
                  >
                    <Wifi className="w-4 h-4 mr-2" />
                    Tentar Novamente
                  </Button>
                  <Button
                    onClick={() => location.reload()}
                    variant="outline"
                    className="border-primary-crx/30 text-primary-crx hover:bg-primary-crx/10"
                  >
                    Recarregar Página
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
