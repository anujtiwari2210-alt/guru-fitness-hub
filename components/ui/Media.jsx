"use client";

import { useState } from "react";
import Image from "next/image";

export default function Media({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-steel via-iron to-volt/20 ${className}`}
    >
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`object-cover ${imgClassName}`}
        />
      )}

      {failed && (
        <span className="absolute inset-0 flex items-center justify-center p-4 text-center font-display text-2xl uppercase text-bone/30">
          {alt}
        </span>
      )}
    </div>
  );
}