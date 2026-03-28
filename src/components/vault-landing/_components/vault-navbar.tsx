import { vaultSectionLinks } from "@/components/vault-landing/content";
import { Button } from "@/components/ui/button";
import { Github, Sparkles } from "lucide-react";

interface VaultNavbarProps {
  repositoryUrl: string;
}

export function VaultNavbar({ repositoryUrl }: VaultNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bg-surface/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#visao" className="inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-crx/20 text-primary-crx">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight">Critix Vault</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {vaultSectionLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-text-secondary transition-all hover:border-primary-crx/60 hover:text-text-primary"
            >
              {link.label}
            </a>
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
