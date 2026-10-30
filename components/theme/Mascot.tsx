interface MascotProps {
  className?: string;
}

// ponytail: maskot SVG neo brutalism buatan sendiri, aria-hidden, 0 runtime dep
export function Mascot({ className = "size-20" }: MascotProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="14" y="24" width="92" height="76" rx="20" fill="var(--accent)" stroke="#000" strokeWidth="4" />
      <rect x="26" y="36" width="68" height="52" rx="12" fill="#fff" stroke="#000" strokeWidth="3" />
      <circle cx="46" cy="58" r="6" fill="#000" />
      <circle cx="74" cy="58" r="6" fill="#000" />
      <circle cx="48" cy="56" r="2" fill="#fff" />
      <circle cx="76" cy="56" r="2" fill="#fff" />
      <path d="M50 72 Q60 80 70 72" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 12 L60 24" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="10" r="5" fill="#facc15" stroke="#000" strokeWidth="3" />
    </svg>
  );
}
