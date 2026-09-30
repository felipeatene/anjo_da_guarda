import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink, GlassCard } from "@/components/ui";

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8">
      <GlassCard className="hero-aurora relative overflow-hidden px-8 py-14 text-center sm:px-14">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-mist-100 sm:text-4xl">
          Deixe a tecnologia <span className="text-gradient">velar por você</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-mist-300">
          Crie sua conta gratuita, receba seu Token Pessoal e instale seu primeiro atalho ainda hoje.
        </p>
        <ButtonLink href="/login" size="lg" className="mt-8">
          Criar conta gratuita <ArrowRight className="size-4" />
        </ButtonLink>
      </GlassCard>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <Logo />
        <nav className="flex items-center gap-6 text-sm text-mist-500" aria-label="Rodapé">
          <Link href="#catalogo" className="transition-colors hover:text-mist-100">
            Catálogo
          </Link>
          <Link href="#como-funciona" className="transition-colors hover:text-mist-100">
            Como funciona
          </Link>
          <Link href="/login" className="transition-colors hover:text-mist-100">
            Entrar
          </Link>
        </nav>
        <p className="text-xs text-mist-500">© 2026 Coletivo Inspira · Anjo da Guarda</p>
      </div>
    </footer>
  );
}
