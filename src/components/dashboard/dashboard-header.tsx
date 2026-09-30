import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-night-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="grid size-9 place-items-center rounded-full border border-white/10 text-mist-400 transition-colors hover:text-mist-100"
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <Logo />
        </div>
        <Badge tone="vital">
          <span className="size-1.5 animate-pulse rounded-full bg-vital-400" />
          Monitoramento ativo
        </Badge>
      </div>
    </header>
  );
}
