import { vaultSectionLinks } from "@/components/vault-landing/content";
import { Button } from "@/components/ui/button";
import { Github, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface VaultNavbarProps {
  repositoryUrl: string;
}

export function VaultNavbar({ repositoryUrl }: VaultNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bg-surface/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="#visao" className="flex hover:scale-105 transition-all items-center  group cursor-pointer">
            <Image
              src={"/images/logo-full.png"}
              width={100}
              height={100}
              alt="Critix Logo"
              title="Critix"
              className=""
            />
            <span className="w-3 h-3 bg-amber-400 rounded-tl-full rounded-bl-full rounded-tr-full"/>
            <span className="font-display font-bold text-text-primary text-4xl"> <span className="text-primary animate-pulse">V</span>ault</span>
          </Link>

        <div className="hidden items-center gap-2 md:flex">
          {vaultSectionLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-text-secondary transition-all hover:border-primary-crx/60 hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button asChild className="rounded-full bg-primary-crx text-on-primary-crx hover:bg-primary-hover-crx">
          <a href={repositoryUrl} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" />
            Repositorio
          </a>
        </Button>
      </nav>
    </header>
  );
}
