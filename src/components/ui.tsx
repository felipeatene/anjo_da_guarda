import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Botões do Design System ─────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-guard-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-guard-500 to-vital-500 text-white shadow-glow hover:shadow-[0_0_52px_rgb(47_125_246/0.5)] hover:brightness-110 active:scale-[0.98]",
  secondary:
    "glass text-mist-100 hover:border-guard-400/40 hover:bg-night-700/60 active:scale-[0.98]",
  ghost: "text-mist-300 hover:text-mist-100 hover:bg-white/5",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props} />
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", size = "md", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props}>
      {children}
    </Link>
  );
}

/* ── Cards flutuantes (glassmorphism) ────────────────────────── */

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass card-float p-6", className)} {...props} />;
}

/* ── Badge / chip ────────────────────────────────────────────── */

type BadgeTone = "guard" | "vital" | "tech" | "warn" | "danger" | "neutral";

const badgeTones: Record<BadgeTone, string> = {
  guard: "bg-guard-500/15 text-guard-300 border-guard-400/25",
  vital: "bg-vital-500/15 text-vital-300 border-vital-400/25",
  tech: "bg-tech-500/15 text-tech-300 border-tech-400/25",
  warn: "bg-warn-400/15 text-warn-400 border-warn-400/25",
  danger: "bg-danger-500/15 text-danger-400 border-danger-400/25",
  neutral: "bg-white/5 text-mist-300 border-white/10",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        badgeTones[tone],
        className
      )}
      {...props}
    />
  );
}

/* ── Título de seção ─────────────────────────────────────────── */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-vital-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-mist-100 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-mist-300">{description}</p> : null}
    </div>
  );
}
