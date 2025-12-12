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
  fallbackSrc = "https://res.cloudinary.com/dg9hqvlas/image/upload/q_auto:low/c_scale,w_1200/f_webp/v1764631407/placeholder_v3gsdr.png",
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
      onError={handleError}
      style={{
        objectFit: "cover",
        ...props.style,
      }}
    />
  );
}
