"use client";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, error, icon, ...props }, ref) => (
  <div className="relative w-full flex flex-col">
    {!!icon && (
      <div className="absolute left-3 top-3 flex items-center justify-center text-text-secondary pointer-events-none">
        {icon}
      </div>
    )}
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-border-color bg-bg-surface-light px-4 py-3 text-sm text-text-primary transition-all duration-200",
        "placeholder:text-text-muted",
        "focus:border-color-primary focus:outline-none focus:ring-2 focus:ring-color-primary/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        !!error && "border-color-danger focus:border-color-danger focus:ring-color-danger/20",
        !!icon && "pl-11",
        className
      )}
      ref={ref}
      {...props}
    />
    {!!error && <p className="mt-1.5 text-xs text-color-danger">{error}</p>}
  </div>
));
Input.displayName = "Input";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, error, icon, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      {!!icon && (
        <div className="absolute left-3 top-3 flex items-center justify-center text-text-secondary pointer-events-none z-10">
          {icon}
        </div>
      )}
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "flex h-12 w-full rounded-xl border border-border-color bg-bg-surface-light px-4 py-3 pr-12 text-sm text-text-primary transition-all duration-200",
          "placeholder:text-text-muted",
          "focus:border-color-primary focus:outline-none focus:ring-2 focus:ring-color-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !!error && "border-color-danger focus:border-color-danger focus:ring-color-danger/20",
          !!icon && "pl-11",
          className
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
      {!!error && <p className="mt-1.5 text-xs text-color-danger">{error}</p>}
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
