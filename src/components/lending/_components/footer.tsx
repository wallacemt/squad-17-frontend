"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Instagram, Mail, Stars } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Comunidade: [
    { name: "Blog", href: "/blog" },
    { name: "Fórum", href: "/forum" },
    { name: "Discord", href: "#discord" },
    { name: "Newsletter", href: "#newsletter" },
  ],
  Empresa: [
    { name: "Sobre", href: "/about" },
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
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="flex flex-wrap justify-between items-baseline gap-4">
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
        </div>

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between border-border-color border-t p-2">
          <div className="mb-8 pt-8">
            <div className="max-w-md flex flex-col items-baseline justify-center ">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-crx/20 bg-primary-crx/5 px-3 py-1"
              >
                <span className="text-lg">📬</span>
                <span className="text-primary-crx text-sm font-medium">Newsletter Semanal</span>
              </motion.div>
              <h3 className="mb-3 font-bold text-text-primary text-xl">Não perca nenhuma estreia</h3>
              <p className="mb-4 text-text-secondary/80">
                Receba recomendações personalizadas, reviews em destaque e lançamentos toda semana. Direto na sua caixa
                de entrada. 💌
              </p>
              <div className="flex flex-col md:flex-row w-full gap-3">
                <Input
                  type="email"
                  placeholder="seu-melhor@email.com"
                  className="flex-1 rounded-full border border-border-color bg-bg-surface-light px-6 py-3 text-text-primary transition-all placeholder:text-text-muted focus:border-primary-crx focus:outline-none focus:ring-2 focus:ring-primary-crx/20"
                />
                <Button
                  className="rounded-full bg-primary-crx/80 px-6 py-3 font-semibold transition-all hover:bg-primary-hover-crx"
                  style={{ color: "#000" }}
                >
                  Inscrever-se <Stars className="text-purple-700" />
                </Button>
              </div>
            </div>
          </div>
          <Image
            src={"https://res.cloudinary.com/dg9hqvlas/image/upload/v1764635802/pUeXcg80cO8I8_x3uqy7.webp"}
            width={300}
            height={200}
            alt="popcon"
            className="rounded-2xl shadow-md shadow-amber-400 hidden md:block"
          />
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
