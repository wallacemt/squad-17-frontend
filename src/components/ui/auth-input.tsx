"use client";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, useState, useEffect } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, error, icon, ...props }, ref) => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative w-full flex flex-col">
      {!!icon && (
        <div className="absolute left-3 top-3 flex items-center justify-center text-white pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-color bg-surface-light-crx px-4 py-3 text-sm text-primary-crx transition-all duration-200",
          "placeholder:text-text-muted",
          "focus:border-primary-crx focus:outline-none focus:ring-2 focus:ring-primary-crx/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !!error && "border-color-danger focus:border-color-danger focus:ring-danger-crx/20",
          !!icon && "pl-11",
          className
        )}
        ref={ref}
        {...props}
      />
      {!!error && showError && (
        <p className="mt-1.5 text-xs text-danger-crx font-bold animate-in fade-in duration-200">{error}</p>
      )}
    </div>
  );
});
Input.displayName = "Input";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, error, icon, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative w-full">
      {!!icon && (
        <div className="absolute left-3 top-3 flex items-center justify-center text-white pointer-events-none z-10">
          {icon}
        </div>
      )}
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "flex h-12 w-full rounded-xl border border-color bg-surf  ace-light-crx px-4 py-3 pr-12 text-sm text-primary-crx transition-all duration-200",
          "placeholder:text-text-muted",
          "focus:border-primary-crx focus:outline-none focus:ring-2 focus:ring-primary-crx/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !!error && "border-danger-crx focus:border-danger-crx focus:ring-danger-crx/20",
          !!icon && "pl-11",
          className
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 flex items-center justify-center text-text-secondary-crx hover:text-primary-crx transition-colors"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
      {!!error && showError && (
        <p className="mt-1.5 text-xs text-danger-crx font-bold animate-in fade-in duration-200">{error}</p>
      )}
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
