"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import type { TMDBTrendingPostersResponse } from "@/types/tmdb";
import { getImageUrl } from "@/utils/tmdbUtils";
import { OptimizedImage } from "./optimized-image";

interface AuthCarouselProps {
  images: TMDBTrendingPostersResponse[];
  autoPlayInterval?: number;
}

export function AuthCarousel({
  images,
  autoPlayInterval = 5000,
}: AuthCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-r-2xl bg-surface-crx">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative h-full w-ful"
        >
          <OptimizedImage
            src={getImageUrl(images[currentIndex]?.src ?? "", "original")}
            alt={images[currentIndex]?.alt ?? "Media Image"}
            fill
            fallbackSrc="/images/placeholder-image-carrousel.webp"
            className="object-cover"
            priority
          />

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          {/* Conteúdo do slide */}
          {(!!images[currentIndex]?.title ||
            !!images[currentIndex]?.subtitle ||
            "") && (
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/60 rounded-b-2xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex flex-col gap-2 items-start">
                  {!!images[currentIndex]?.title && (
                    <h3 className="mb-2 font-bold font-display text-3xl text-white">
                      {images[currentIndex]?.title}
                    </h3>
                  )}
                  {!!images[currentIndex]?.subtitle && (
                    <p className="text-lg text-white/80 ">
                      {images[currentIndex]?.subtitle ?? ""}
                    </p>
                  )}
                  <span className="w-full border-b-2" />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((i, index) => (
          <Button
            key={i.src}
            size={"icon"}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary-crx"
                : "w-2 bg-white/40 hover:bg-white/60 cursor-pointer"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
