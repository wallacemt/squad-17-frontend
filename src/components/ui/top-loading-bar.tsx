"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

export default function TopLoadingBar() {
  const pathname = usePathname();
  const timer = useRef<NodeJS.Timeout | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignore
  useEffect(() => {
    NProgress.start();
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      NProgress.done();
    }, 600);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [pathname]);

  return null;
}
