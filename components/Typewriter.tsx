"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Render awal = teks penuh role pertama (sama di server & client), animasi mulai setelah mount.
export default function Typewriter({ roles }: { roles: string[] }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(roles[0].length);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = roles[i].length;
    const t = setTimeout(
      () => {
        if (!del && n === full) setDel(true);
        else if (del && n === 0) { setDel(false); setI((i + 1) % roles.length); }
        else setN(n + (del ? -1 : 1));
      },
      !del && n === full ? 1800 : del ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [reduced, roles, i, n, del]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {roles[i].slice(0, n)}
        <span className="animate-pulse motion-reduce:animate-none">|</span>
      </span>
    </>
  );
}
