"use client";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "compact";
  className?: string;
}

export function Logo({ variant = "default", className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex flex-col  ritems-center gap-3 group ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-hover-crx rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-color-primary to-color-primary-hover">
          <Image
            src={"/images/logo-full.png"}
            width={140}
            height={30}
            alt="Critix Logo"
            className="hover:scale-105 transition-all"
          />
        </div>
      </div>
      {variant === "default" && (
        <div className="flex flex-col">
          <span className="text-xs text-text-muted leading-none">
            Sua opinião amplificada
          </span>
        </div>
      )}
    </Link>
  );
}
