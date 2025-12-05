"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Star, TrendingUp, Users, Sparkles } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";

const navItems = [
  { name: "Explorar", href: "#features", icon: Sparkles },
  { name: "Tendências", href: "#trending", icon: TrendingUp },
  { name: "Comunidade", href: "#community", icon: Users },
  { name: "Sobre", href: "#about", icon: Star },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-bg-surface/95 backdrop-blur-xl  shadow-lg" : "bg-transparent"
      } ${isMobileMenuOpen ? "bg-bg-surface/95 backdrop-blur-xl  shadow-lg" : ""}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={"/logo-full.png"}
              width={140}
              height={30}
              alt="Critix Logo"
              className="hover:scale-105 transition-all"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors relative"
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-crx transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </div>
          <span className="left-0 w-0 h-0.5" />
          <span className="left-0 w-0 h-0.5" />

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:bg-bg-surface-light rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {!!isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-surface border-t border-border-color"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-surface-light transition-colors relative group   text-text-secondary hover:text-text-primary  "
                  >
                    <Icon className="h-5 w-5 text-primary-crx" />
                    <span className="font-medium text-text-primary">{item.name}</span>
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary-crx  transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
