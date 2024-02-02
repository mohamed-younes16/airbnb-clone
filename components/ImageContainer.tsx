"use client";
import Image from "next/image";
import { useState } from "react";
const ImageContainer = ({ src, alt }: { src: string; alt?: string }) => {
  const [isLoaded, setIsloaded] = useState(false);
  return (
    <div className=" w-full relative h-full">
      {!isLoaded && (
        <div
          className={`absolute  animate-pulse inset-0  transition-all bg-accent-foreground/40 ${
            isLoaded && "opacity-0"
          } `}
        />
      )}

      <Image
        onLoad={() => setIsloaded(true)}
        height={100}
        width={100}
        className={`object-cover transition-all  duration-1000 h-full w-full ${
          !isLoaded && "opacity-0"
        }`}
        src={src}
        alt={alt || ""}
      />
    </div>
  );
};

export default ImageContainer;
