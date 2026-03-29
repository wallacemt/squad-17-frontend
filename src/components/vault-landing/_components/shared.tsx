import { cn } from "@/lib/utils";
import type { VaultInstallableAsset } from "@/types/vault-downloads";

interface BorderGradientPanelProps {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export function BorderGradientPanel({ className, innerClassName, children }: BorderGradientPanelProps) {
  return (
    <div className={cn("rounded-3xl bg-gradient-to-br from-white/30 p-[1px] via-white/10 to-white/0", className)}>
      <div className={cn("rounded-[calc(1.5rem-1px)] bg-bg-surface/85 backdrop-blur-xl", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

export function formatDate(date: string | null): string {
  if (!date) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function platformLabel(asset: VaultInstallableAsset): string {
  if (asset.platform === "windows") {
    return "Windows";
  }

  if (asset.platform === "macos") {
    return "macOS";
  }

  if (asset.platform === "linux") {
    return "Linux";
  }

  return "Desktop";
}
