/** biome-ignore-all lint/performance/useTopLevelRegex: abreviation regex logic */
"use client";

import { cn } from "@/lib/utils";

interface PasswordStrengthBarProps {
  password: string;
  className?: string;
}

function calculateStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) {
    return { score: 0, label: "", color: "" };
  }

  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 1;
  }
  if (password.length >= 12) {
    score += 1;
  }

  // Character variety
  if (/[a-z]/.test(password)) {
    score += 1;
  }
  if (/[A-Z]/.test(password)) {
    score += 1;
  }
  if (/[0-9]/.test(password)) {
    score += 1;
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  }

  const strength = Math.min(Math.floor((score / 6) * 4), 4);

  const labels = ["Muito fraca", "Fraca", "Razoável", "Forte", "Muito forte"];
  const colors = [
    "bg-danger-crx",
    "bg-yellow-400",
    "bg-blue-700",
    "bg-success-crx",
    "bg-success-crx",
  ];

  return {
    score: strength,
    label: labels[strength] || "",
    color: colors[strength] || "",
  };
}

export function PasswordStrengthBar({
  password,
  className,
}: PasswordStrengthBarProps) {
  const { score, label, color } = calculateStrength(password);

  if (!password) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              index <= score ? color : "bg-surface-light-crx"
            )}
          />
        ))}
      </div>
      {!!label && (
        <p
          className={cn(
            "text-xs font-medium",
            `text-${color.replace("bg-", "")}`
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
}
