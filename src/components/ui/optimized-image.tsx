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
  quality?:number;
}

export function OptimizedImage({
  alt,
  title,
  priority = false,
  fallbackSrc = "/images/placeholder.webp",
  quality = 85,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(props.src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      title={title || alt}
      priority={priority}
      quality={quality}
      onError={handleError}
      sizes="100vw"
      style={{
        objectFit: "cover",
        ...props.style,
      }}
    />
  );
}