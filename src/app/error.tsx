"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home, ServerCrash, WifiOff, Bug } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  bgGradient: string;
}

function getErrorInfo(error: Error): ErrorInfo {
  const message = error.message?.toLowerCase() || "";

  if (message.includes("api") || message.includes("servidor") || message === "api_error") {
    return {
      title: "Erro no Servidor",
      description: "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.",
      icon: <ServerCrash className="w-16 h-16" />,
      iconColor: "text-red-500",
      bgGradient: "from-red-500/20 to-orange-500/20",
    };
  }

  if (message.includes("network") || message.includes("fetch") || message.includes("rede")) {
    return {
      title: "Erro de Conexão",
      description: "Verifique sua conexão com a internet e tente novamente.",
      icon: <WifiOff className="w-16 h-16" />,
      iconColor: "text-orange-500",
      bgGradient: "from-orange-500/20 to-yellow-500/20",
    };
  }

  return {
    title: "Algo Deu Errado",
    description: error.message || "Ocorreu um erro inesperado. Por favor, tente novamente.",
    icon: <Bug className="w-16 h-16" />,
    iconColor: "text-amber-500",
    bgGradient: "from-amber-500/20 to-yellow-500/20",
  };
}

export default function ErrorPage({ error, reset }: { error: Error; reset?: () => void }) {
  const router = useRouter();
  const errorInfo = getErrorInfo(error);

  console.error("Error occurred:", error);

  return (
    <div className="min-h-screen bg-on-primary-crx flex flex-col items-center justify-center px-4 text-center overflow-hidden relative">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-body via-bg-surface to-bg-body" />
        <div className={`absolute inset-0 bg-gradient-to-br ${errorInfo.bgGradient} opacity-30 animate-pulse`} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-crx/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Ícone animado */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className={`absolute inset-0 ${errorInfo.iconColor} opacity-20 blur-xl animate-pulse`} />
            <div className={`relative ${errorInfo.iconColor} bg-bg-surface p-6 rounded-full border-2 border-current`}>
              {errorInfo.icon}
            </div>
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-crx via-primary-hover-crx to-primary-crx bg-clip-text text-transparent"
        >
          {errorInfo.title}
        </motion.h1>

        {/* Descrição */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary text-lg md:text-xl mb-8 max-w-xl mx-auto"
        >
          {errorInfo.description}
        </motion.p>

        {/* Imagem SVG (se existir) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Image
            src="/images/503.svg"
            width={300}
            height={300}
            alt="Ilustração de erro"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            className="w-full max-w-xs mx-auto opacity-60 hover:opacity-80 transition-opacity"
          />
        </motion.div>

        {/* Código de erro (se disponível) */}
        {error.stack && (
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 text-left max-w-lg mx-auto"
          >
            <summary className="cursor-pointer text-text-muted hover:text-text-secondary transition-colors flex items-center gap-2 justify-center">
              <AlertTriangle className="w-4 h-4" />
              Detalhes técnicos (clique para expandir)
            </summary>
            <pre className="mt-4 p-4 bg-bg-surface-light rounded-lg text-xs text-text-secondary overflow-auto max-h-40">
              {error.stack}
            </pre>
          </motion.details>
        )}

        {/* Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (reset ? reset() : window.location.reload())}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-crx to-primary-hover-crx rounded-full font-semibold text-on-primary-crx shadow-lg hover:shadow-[0_0_30px_rgba(255,193,7,0.4)] transition-all"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Tentar Novamente
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-8 py-4 border-2 border-primary-crx rounded-full font-semibold text-primary-crx hover:bg-primary-crx/10 transition-all"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </motion.button>
        </motion.div>

        {/* Mensagem de suporte */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-text-muted text-sm"
        >
          Se o problema persistir, entre em contato com o{" "}
          <a href="mailto:support@critix.com" className="text-primary-crx hover:text-primary-hover-crx underline">
            suporte
          </a>
        </motion.p>
      </div>
    </div>
  );
}
