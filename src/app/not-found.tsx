"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Film, TrendingUp, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const quickLinks = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/search", icon: Search, label: "Buscar" },
  { href: "/tier-rank", icon: TrendingUp, label: "Rankings" },
  { href: "/watchlist", icon: Film, label: "Watchlist" },
];

export default function NotFound() {
  const pathname = usePathname();
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-on-primary-crx flex flex-col items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-body via-bg-surface to-bg-body" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-crx/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Número 404 gigante */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          {/* Imagem SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Image
              src="/images/404.svg"
              alt="404 Ilustração"
              width={400}
              height={400}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
              className="w-full max-w-md mx-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </motion.div>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
        >
          Oops! Página Não Encontrada
        </motion.h2>

        {/* Descrição */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          A página que você está procurando não existe ou foi movida para outro lugar.
        </motion.p>

        {/* URL tentada */}
        {pathname && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-text-muted mb-2">Você tentou acessar:</p>
            <code className="inline-block bg-bg-surface-light px-4 py-2 rounded-lg text-primary-crx font-mono text-sm">
              {pathname}
            </code>
          </motion.div>
        )}

        {/* Botão principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-crx to-primary-hover-crx rounded-full font-semibold text-on-primary-crx shadow-lg hover:shadow-[0_0_30px_rgba(255,193,7,0.4)] transition-all"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Início
            </motion.button>
          </Link>
        </motion.div>

        {user && (
          <>
            {/* Links rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-text-secondary mb-6">Ou explore estas páginas:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Link href={link.href}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group p-6 bg-bg-surface border border-border-color rounded-xl hover:border-primary-crx/50 hover:bg-bg-surface-light transition-all cursor-pointer"
                      >
                        <link.icon className="w-8 h-8 mx-auto mb-3 text-primary-crx group-hover:scale-110 transition-transform" />
                        <p className="text-text-primary font-semibold group-hover:text-primary-crx transition-colors">
                          {link.label}
                        </p>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
        {/* Mensagem adicional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-text-muted text-sm"
        >
          Precisa de ajuda?{" "}
          <a href="mailto:support@critix.com" className="text-primary-crx hover:text-primary-hover-crx underline">
            Entre em contato conosco
          </a>
        </motion.p>
      </div>
    </div>
  );
}
