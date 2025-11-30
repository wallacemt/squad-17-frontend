"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Instagram, Mail } from "lucide-react";

const footerLinks = {
  Produto: [
    { name: "Recursos", href: "#features" },
    { name: "Preços", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Roadmap", href: "#roadmap" },
  ],
  Comunidade: [
    { name: "Blog", href: "/blog" },
    { name: "Fórum", href: "/forum" },
    { name: "Discord", href: "#discord" },
    { name: "Newsletter", href: "#newsletter" },
  ],
  Empresa: [
    { name: "Sobre", href: "/about" },
    { name: "Carreiras", href: "/careers" },
    { name: "Contato", href: "/contact" },
    { name: "Imprensa", href: "/press" },
  ],
  Legal: [
    { name: "Privacidade", href: "/privacy" },
    { name: "Termos", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "Licenças", href: "/licenses" },
  ],
} as const;

const socialLinks = [
  { icon: Github, href: "#github", label: "GitHub" },
  { icon: Twitter, href: "#twitter", label: "Twitter" },
  { icon: Instagram, href: "#instagram", label: "Instagram" },
  { icon: Mail, href: "#email", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-border-color border-t bg-bg-surface">
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo e descrição */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Image src="/logo-full.png" alt="CRITIX" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mb-6 max-w-sm text-text-secondary">
              A plataforma definitiva para críticos de cinema. Avalie, descubra e compartilhe suas opiniões sobre filmes
              e séries.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-color bg-bg-surface-light text-text-secondary transition-all hover:border-color-primary/50 hover:text-color-primary"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links de navegação */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 font-bold text-text-primary">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-text-secondary transition-colors hover:text-color-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mb-8 border-border-color border-t pt-8">
          <div className="max-w-md">
            <h3 className="mb-3 font-bold text-text-primary">Fique por dentro das novidades</h3>
            <p className="mb-4 text-sm text-text-secondary">
              Receba atualizações sobre novos recursos e os melhores filmes avaliados.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 rounded-full border border-border-color bg-bg-surface-light px-6 py-3 text-text-primary transition-colors placeholder:text-text-muted focus:border-color-primary focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-color-primary px-6 py-3 font-semibold text-color-on-primary transition-colors hover:bg-color-primary-hover"
              >
                Inscrever
              </motion.button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-border-color border-t pt-8 text-sm text-text-secondary md:flex-row">
          <p>© {new Date().getFullYear()} CRITIX. Todos os direitos reservados.</p>
          <p>
            Feito com <span className="text-color-like">❤️</span> para os amantes de cinema
          </p>
        </div>
      </div>
    </footer>
  );
}
