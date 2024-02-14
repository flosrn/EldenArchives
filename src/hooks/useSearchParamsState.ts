import { useRouter, useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { useDebounceFn } from "./useDebounceFn";

export const useSearchParamsState = <T extends string>(
  key: string,
  defaultValue: T = "" as T,
): [T, Dispatch<SetStateAction<T>>] => {
  const params = useSearchParams();

  const [value, setValue] = useState<T>(() => {
    const value_ = params.get(key) as T | null;
    return value_ ?? defaultValue;
  });

  const router = useRouter();

  const lastValueRef = useRef(value);

  const replace = useDebounceFn((url: string) => {
    router.replace(url.toString());
  });

  useEffect(() => {
    if (value === lastValueRef.current) {
      return;
    }
    lastValueRef.current = value;

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set(key, value);
    url.search = searchParams.toString();
    replace(url.toString());
  }, [value, key, defaultValue, router, replace]);

  return [value, setValue];
};
