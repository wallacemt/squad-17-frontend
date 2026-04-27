"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Star,
  TrendingUp,
  Users,
  Sparkles,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useAuthContext } from "@/context/authContext";

const navItems = [
  { name: "Explorar", href: "#features", icon: Sparkles },
  { name: "Tendências", href: "#trending", icon: TrendingUp },
  { name: "Comunidade", href: "#community", icon: Users },
  { name: "Sobre", href: "#about", icon: Star },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();

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
        isScrolled
          ? "bg-bg-surface/95 backdrop-blur-xl  shadow-lg"
          : "bg-transparent"
      } ${isMobileMenuOpen ? "bg-bg-surface/95 backdrop-blur-xl  shadow-lg" : ""}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <Image
              src={"/images/logo-full.png"}
              width={140}
              height={30}
              alt="Critix Logo"
              title="Critix"
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
                  className="group flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors relative"
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-crx transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              // Usuário autenticado
              <>
                <Link
                  href="/"
                  className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="font-medium">Home</span>
                </Link>

                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border-color bg-bg-surface-light">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary-crx to-primary-hover-crx flex items-center justify-center">
                    {user.profile?.avatarUrl ? (
                      <Image
                        src={user.profile.avatarUrl}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-text-primary font-medium">
                    {user.name}
                  </span>
                </div>

                <Button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-color bg-transparent hover:bg-red-500/10 hover:border-red-500 text-text-secondary hover:text-red-500 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Sair</span>
                </Button>
              </>
            ) : (
              // Usuário não autenticado
              <>
                <Link href="/auth?mode=login">
                  <Button className="px-6 py-2 rounded-full border border-border-color bg-transparent hover:bg-bg-surface-light text-text-primary transition-all">
                    Entrar
                  </Button>
                </Link>
                <Link href="/auth?mode=register">
                  <Button className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-600 to-primary-hover-crx/60 hover:shadow-[0_0_20px_rgba(255,193,7,0.4)] text-white font-semibold transition-all">
                    Registrar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:bg-bg-surface-light rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
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
              {/* Navigation Links */}
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
                    <span className="font-medium text-text-primary">
                      {item.name}
                    </span>
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary-crx  transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="h-px bg-border-color my-4" />

              {/* User Actions - Mobile */}
              {user ? (
                // Usuário autenticado
                <>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-surface-light">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-crx to-primary-hover-crx flex items-center justify-center">
                      {user.profile?.avatarUrl ? (
                        <Image
                          src={user.profile.avatarUrl}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-text-primary font-semibold">
                        {user.name}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-surface-light transition-colors"
                  >
                    <Home className="h-5 w-5 text-primary-crx" />
                    <span className="font-medium text-text-primary">Home</span>
                  </Link>

                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500 text-text-secondary hover:text-red-500 transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sair</span>
                  </Button>
                </>
              ) : (
                // Usuário não autenticado
                <>
                  <Link
                    href="/auth?mode=login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full px-6 py-3 rounded-full border border-border-color bg-transparent hover:bg-bg-surface-light text-text-primary transition-all">
                      Entrar
                    </Button>
                  </Link>
                  <Link
                    href="/auth?mode=register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-primary-hover-crx/60 hover:shadow-[0_0_20px_rgba(255,193,7,0.4)] text-white font-semibold transition-all">
                      Registrar
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
