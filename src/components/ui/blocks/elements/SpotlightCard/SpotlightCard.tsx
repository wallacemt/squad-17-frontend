"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

interface SpotlightCardProps {
  className?: string;
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
}

interface SpotlightState {
  x: number;
  y: number;
  opacity: number;
}

const defaultSpotlightState: SpotlightState = {
  x: 0,
  y: 0,
  opacity: 0,
};

export default function SpotlightCard({
  className,
  children,
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  spotlightSize = 280,
}: SpotlightCardProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState>(defaultSpotlightState);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const bounds = elementRef.current?.getBoundingClientRect();

      if (!bounds) {
        return;
      }

      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!isInside) {
        setSpotlight((current) => ({
          ...current,
          opacity: 0,
        }));
        return;
      }

      setSpotlight({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        opacity: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const spotlightStyle = useMemo(
    () => ({
      background: `radial-gradient(${spotlightSize}px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent 60%)`,
      opacity: spotlight.opacity,
    }),
    [spotlight, spotlightColor, spotlightSize],
  );

  return (
    <div ref={elementRef} className={cn("group relative overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={spotlightStyle}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
