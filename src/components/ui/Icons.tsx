import type { SVGProps } from "react";

/**
 * Jeu d'icônes maison, trait 1.6, grille 24.
 * Inline plutôt qu'une librairie : aucun octet de JS supplémentaire.
 */

type P = SVGProps<SVGSVGElement>;

function Svg({ children, ...p }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...p}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h13M12 5l7 7-7 7" />
  </Svg>
);

export const Check = (p: P) => (
  <Svg {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Svg>
);

export const Ledger = (p: P) => (
  <Svg {...p}>
    <path d="M5 4h11l3 3v13H5z" />
    <path d="M9 9h6M9 13h6M9 17h4" />
  </Svg>
);

export const Shield = (p: P) => (
  <Svg {...p}>
    <path d="M12 3 5 6v6c0 4.4 2.9 7.9 7 9 4.1-1.1 7-4.6 7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const Chart = (p: P) => (
  <Svg {...p}>
    <path d="M4 20h16" />
    <path d="M7 20v-6M12 20V7M17 20v-9" />
  </Svg>
);

export const Users = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.5a3.2 3.2 0 0 1 0 6M17.5 19.5a5.6 5.6 0 0 0-2.2-4.5" />
  </Svg>
);

export const Cloud = (p: P) => (
  <Svg {...p}>
    <path d="M7 18a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 9.5a3.8 3.8 0 0 1 .6 8.5z" />
    <path d="M12 21v-6m0 0-2 2m2-2 2 2" />
  </Svg>
);

export const Lock = (p: P) => (
  <Svg {...p}>
    <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
    <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
  </Svg>
);

export const Spark = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 20.5 10.2 12.6 4.5 10.8 10.2 9z" />
  </Svg>
);

export const Phone = (p: P) => (
  <Svg {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5L15.5 12l4 1.5v3a2.5 2.5 0 0 1-2.8 2.5C10.7 18.4 5.6 13.3 4 7.3A2.5 2.5 0 0 1 6.5 3.5" />
  </Svg>
);

export const Mail = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 8 7.5 5 7.5-5" />
  </Svg>
);

export const Pin = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const Clock = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const External = (p: P) => (
  <Svg {...p}>
    <path d="M14 4h6v6" />
    <path d="M20 4 11 13" />
    <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10" />
  </Svg>
);

export const Compass = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </Svg>
);

export const Menu = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const Close = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const Alert = (p: P) => (
  <Svg {...p}>
    <path d="M12 4.5 21 19.5H3z" />
    <path d="M12 10v4M12 17h.01" />
  </Svg>
);
