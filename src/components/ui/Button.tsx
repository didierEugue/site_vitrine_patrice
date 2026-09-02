import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "accent" | "outline" | "light" | "signal";
type Size = "md" | "lg";

/**
 * Boutons rectangulaires à angles très légèrement adoucis et libellé en
 * monospace. La pilule arrondie est le marqueur visuel du gabarit générique —
 * on s'en éloigne volontairement.
 */
const BASE =
  "label group/btn inline-flex items-center justify-center gap-2.5 rounded-sm whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 active:translate-y-px";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink-900 text-paper-50 hover:bg-brand-700",
  accent: "bg-brand-600 text-white hover:bg-brand-500",
  outline: "border border-current/35 text-current hover:bg-current/10",
  light: "bg-paper-50 text-ink-900 hover:bg-white",
  signal: "bg-signal-500 text-white hover:bg-signal-400",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-3",
  lg: "px-7 py-4 text-[0.72rem]",
};

export type ButtonProps = {
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  children: ReactNode;
};

export default function Button({
  href,
  type = "button",
  variant = "solid",
  size = "md",
  className = "",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${
    disabled ? "pointer-events-none opacity-55" : ""
  } ${className}`;

  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover/btn:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (!href) {
    return (
      <button type={type} className={cls} disabled={disabled} {...rest}>
        {inner}
      </button>
    );
  }

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
