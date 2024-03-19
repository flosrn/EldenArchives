"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

import { AuthButtonClient } from "@/features/auth/SignInButton";
import { SiteConfig } from "@/site-config";

function useBoundedScroll(threshold: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    const onChange = (current: number) => {
      const previous = scrollY.getPrevious() ?? 0;
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    };

    const deleteEvent = scrollY.on("change", onChange);

    const listener = () => {
      const currentScroll = window.scrollY;
      onChange(currentScroll);
    };

    window.addEventListener("scroll", listener);

    return () => {
      deleteEvent();
      window.removeEventListener("scroll", listener);
    };
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export function LandingHeader() {
  const isDev = process.env.NODE_ENV === "development";
  const { scrollYBoundedProgress } = useBoundedScroll(400);
  const scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );

  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressDelayed, [0, 1], [80, 50]),
        // backgroundColor: useMotionTemplate`rgb(var(--background) / ${useTransform(
        //   scrollYBoundedProgressDelayed,
        //   [0, 1],
        //   [1, 0.1]
        // )})`,
      }}
      className="fixed inset-x-0 z-50 flex h-20 w-screen shadow backdrop-blur-md"
    >
      <div className="mx-auto flex w-full items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-1">
          <Image
            src={SiteConfig.appIcon}
            alt="app logo"
            width={42}
            height={42}
          />
          <motion.p
            style={{
              scale: useTransform(
                scrollYBoundedProgressDelayed,
                [0, 1],
                [1, 0.9]
              ),
            }}
            className="flex origin-left items-center text-xl font-semibold"
          >
            {SiteConfig.title}
          </motion.p>
        </div>
        <motion.nav
          style={{
            opacity: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0]
            ),
          }}
          className="flex items-center gap-4 text-sm font-medium text-muted-foreground"
        >
          {/*<a href="#features">Features</a>*/}
          {/*<a href="#pricing">Pricing</a>*/}
          {isDev && <AuthButtonClient />}
          {/*<ThemeToggle />*/}
        </motion.nav>
      </div>
    </motion.header>
  );
}

const clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);
