"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

export type ItemsSearchProps = {
  placeholder?: string;
};

export const ItemsSearch = ({ placeholder }: ItemsSearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    console.log("input : ", input);
    if (!input) return;

    const handleFocus = () => {
      const currentFontSize = window.getComputedStyle(input).fontSize;
      input.style.fontSize = "16px"; // Taille minimale pour éviter le zoom sur iOS
      input.dataset.originalFontSize = currentFontSize;
    };

    const handleBlur = () => {
      const originalFontSize = input.dataset.originalFontSize;
      if (originalFontSize) {
        input.style.fontSize = originalFontSize;
      }
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      onChange={(event) => handleSearch(event.target.value)}
      defaultValue={searchParams.get("search")?.toString()}
    />
  );
};
