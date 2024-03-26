"use client";

import React from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

export type ItemImageProps = {
  src: string;
  alt: string;
};

export const ItemImage = ({ src, alt }: ItemImageProps) => {
  return (
    <Zoom zoomImg={{ src: `${src}/high`, alt: alt }}>
      <Image
        src={`${src}/high`}
        width={400}
        height={400}
        onError={(event) => {
          console.error("Failed to load high quality image", event);
          event.currentTarget.src = `${src}/low`;
        }}
        alt={alt}
      />
    </Zoom>
  );
};
