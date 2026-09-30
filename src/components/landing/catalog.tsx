"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BellRing,
  CreditCard,
  Droplets,
  Pill,
  Smartphone,
  Stethoscope,
  Sun,
  Timer,
  Wallet,
  Zap,
} from "lucide-react";
import { automations, categoryLabels } from "@/lib/mock-data";
import type { AutomationCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge, GlassCard, SectionHeading } from "@/components/ui";

const iconMap: Record<string, typeof Stethoscope> = {
  stethoscope: Stethoscope,
  "bell-ring": BellRing,
  pill: Pill,
  activity: Activity,
  droplets: Droplets,
  timer: Timer,
  sun: Sun,
  wallet: Wallet,
  "credit-card": CreditCard,
};

type Filter = "todos" | AutomationCategory;
const filters: Filter[] = ["todos", "saude", "esportes", "produtividade", "financas"];

const categoryTone: Record<AutomationCategory, "vital" | "tech" | "guard" | "warn"> = {
  saude: "vital",
  esportes: "tech",
  produtividade: "guard",
  financas: "warn",
};

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("todos");

  const visible = useMemo(
    () => (filter === "todos" ? automations : automations.filter((a) => a.category === filter)),
    [filter]
  );

  return (
    <section id="catalogo" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Catálogo de automações"
        title={
          <>
            Atalhos <span className="text-gradient">plug and play</span> para cada área da sua vida
          </>
        }
        description="Escolha, instale em minutos e pronto. Nada de código: cada automação já nasce pronta para funcionar no seu celular."
      />

      {/* Filtros dinâmicos */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filtrar catálogo por categoria">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
              filter === f
                ? "border-transparent bg-gradient-to-r from-guard-500 to-vital-500 text-white shadow-glow"
                : "glass text-mist-300 hover:border-guard-400/40 hover:text-mist-100"
            )}
          >
            {categoryLabels[f]}
          </button>
        ))}
      </div>

      {/* Grid de automações */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((automation) => {
          const Icon = iconMap[automation.icon] ?? Zap;
          return (
            <GlassCard key={automation.id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-guard-500/25 to-vital-500/25">
                  <Icon className="size-6 text-vital-300" strokeWidth={2} />
                </span>
                <Badge tone={categoryTone[automation.category]}>{categoryLabels[automation.category]}</Badge>
              </div>
              <div>
                <h3 className="text-lg font-bold text-mist-100">{automation.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-300">{automation.description}</p>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/5 pt-4 text-xs text-mist-500">
                <span className="inline-flex items-center gap-1">
                  <Smartphone className="size-3.5" /> {automation.platform}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Timer className="size-3.5" /> Instala em {automation.setupTime}
                </span>
                {automation.sendsData && (
                  <span className="inline-flex items-center gap-1 text-vital-400">
                    <Zap className="size-3.5" /> Integra ao painel
                  </span>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
