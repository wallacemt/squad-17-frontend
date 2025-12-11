"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  title?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  fallbackSrc?: string;
}

export function OptimizedImage({
  alt,
  title,
  priority = false,
  fallbackSrc = "/placeholder-image.webp",
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(props.src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = (e: unknown) => {
    setHasError(true);
    setImgSrc(fallbackSrc);
    if (onError) {
      onError(e as React.SyntheticEvent<HTMLImageElement, Event>);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full">
      {!!isLoading && !hasError && (
        <div className={"absolute inset-0 bg-primary-crx/50 animate-pulse rounded"} aria-hidden="true" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        title={title || alt}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          objectFit: "cover",
          ...props.style,
        }}
      />
    </div>
  );
}
