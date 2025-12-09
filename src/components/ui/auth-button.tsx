"use client";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { forwardRef } from "react";

export interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-primary/70 to-primary-hover-crx/30 text-on-primary hover:shadow-[0_0_20px_rgba(255,193,7,0.4)] disabled:from-primary/50 disabled:to-color-primary-hover/50",
      secondary: "bg-surface-light border  text-text-primary hover:bg-surface hover:border-color-primary/50",
      ghost: "text-primary hover:bg-surface-light",
      danger: "bg-danger-crx text-white hover:bg-color-danger-crx/90 disabled:bg-danger-crx/50",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus:outline-none focus:ring-2 focus:ring-color-primary/20",
          variants[variant],
          sizes[size],
          !!fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader className=" h-5 w-5 animate-spin" />
            Carregando...
          </>
        ) : (
          <>
            {!!icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);
AuthButton.displayName = "AuthButton";

export { AuthButton };
