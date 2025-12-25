"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookmarkIcon, GridIcon, SearchIcon, StarIcon, LogOutIcon, MenuIcon, XIcon } from "lucide-react";
import { useAuthContext } from "@/context/authContext";
import Image from "next/image";
import { Button } from "../ui/button";

const navItems = [
  { name: "Feed", path: "/", icon: GridIcon },
  { name: "Watchlist", path: "/watchlist", icon: BookmarkIcon },
  { name: "Search", path: "/search", icon: SearchIcon },
  { name: "Tier Rank", path: "/tier-rank", icon: StarIcon },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-bg-body overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface-crx border-r border-color">
        {/* Logo */}
        <div className="p-6 border-b border-border-color">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-full.png"
              width={140}
              height={30}
              alt="Critix Logo"
              className="hover:scale-105 transition-all"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary-crx/20 text-color-primary"
                    : "text-secondary hover:bg-surface-light-crx hover:text-primary"
                }`}
              >
                <Icon size={24} />
                <span className="font-medium">{item.name}</span>
                {!!isActive && (
                  <motion.div layoutId="activeTab" className="ml-auto w-1 h-6 bg-primary-crx rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-color space-y-3">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-bg-surface-light">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-crx to-primary-hover-crx flex items-center justify-center">
              {user?.profile?.avatarUrl ? (
                <Image src={user.profile.avatarUrl} alt={user.name} width={40} height={40} className="object-cover" />
              ) : (
                <span className="text-white font-semibold">{user?.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-primary-crx font-semibold truncate">{user?.name}</p>
              <p className="text-secondary text-sm truncate">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <LogOutIcon size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface-crx border-b border-color">
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            <Image src="/logo-full.png" width={120} height={25} alt="Critix Logo" />
          </Link>
          <Button
            variant={"ghost"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-surface-light-crx"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {!!isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-color bg-surface-crx"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary-crx/20 text-primary-crx"
                        : "text-secondary hover:bg-surface-light-crx"
                    }`}
                  >
                    <Icon size={24} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4 mt-4 border-t border-border-color">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-light-crx mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-crx to-primary-hover-crx flex items-center justify-center">
                    {user?.profile?.avatarUrl ? (
                      <Image
                        src={user.profile.avatarUrl}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold">{user?.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-primary font-semibold">{user?.name}</p>
                    <p className="text-secondary text-sm">{user?.email}</p>
                  </div>
                </div>

                <Button
                  variant={"ghost"}
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary-crx hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  <LogOutIcon size={20} />
                  <span className="font-medium">Sair</span>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:mt-0 mt-16">{children}</main>
    </div>
  );
}
