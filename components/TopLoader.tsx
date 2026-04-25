"use client";

import { useEffect, useState, startTransition } from "react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";

export default function TopLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setLoading(true);
      setProgress(20);
    });

    const t1 = setTimeout(() => setProgress(60), 200);
    const t2 = setTimeout(() => setProgress(90), 400);
    const t3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Progress value={progress} className="rounded-none transition-all duration-300" />
    </div>
  );
}