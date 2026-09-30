import type { Metadata } from "next";
import { BellRing, Dumbbell, HeartPulse, KeyRound } from "lucide-react";
import { GlassCard } from "@/components/ui";
import { WaterRing, WorkoutChart } from "@/components/dashboard/activity-charts";
import { AlertsTimeline } from "@/components/dashboard/alerts-timeline";
import { CoughChart } from "@/components/dashboard/cough-chart";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { HeartRateChart } from "@/components/dashboard/heart-rate-chart";
import { SleepChart } from "@/components/dashboard/sleep-chart";
import { TokenPanel } from "@/components/dashboard/token-panel";

export const metadata: Metadata = {
  title: "Meu Anjo da Guarda — Painel de Monitoramento",
};

function ModuleTitle({ icon: Icon, title, subtitle }: { icon: typeof BellRing; title: string; subtitle: string }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-guard-500/25 to-vital-500/25">
        <Icon className="size-5 text-vital-300" strokeWidth={2.2} />
      </span>
      <div>
        <h2 className="text-base font-bold text-mist-100">{title}</h2>
        <p className="text-xs text-mist-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-mist-100 sm:text-3xl">
            Meu <span className="text-gradient">Anjo da Guarda</span>
          </h1>
          <p className="text-sm text-mist-300">
            Quarta-feira, 30 de setembro · dados integrados do seu celular e relógio inteligente
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Token Pessoal */}
          <GlassCard className="lg:col-span-3">
            <ModuleTitle
              icon={KeyRound}
              title="Token Pessoal"
              subtitle="A chave que conecta os atalhos do seu celular a este painel"
            />
            <TokenPanel />
          </GlassCard>

          {/* Módulo de Sintomas e Alertas */}
          <GlassCard className="lg:col-span-2">
            <ModuleTitle
              icon={HeartPulse}
              title="Sintomas — Registro de Tosse"
              subtitle="Últimos 7 dias · captura por reconhecimento de som"
            />
            <CoughChart />
          </GlassCard>

          <GlassCard>
            <ModuleTitle
              icon={BellRing}
              title="Alertas Enviados"
              subtitle="Notificações aos responsáveis"
            />
            <AlertsTimeline />
          </GlassCard>

          {/* Módulo de Sinais Vitais e Sono */}
          <GlassCard className="lg:col-span-2">
            <ModuleTitle
              icon={HeartPulse}
              title="Sinais Vitais — Batimentos Cardíacos"
              subtitle="Hoje · sincronizado do relógio inteligente"
            />
            <HeartRateChart />
          </GlassCard>

          <GlassCard>
            <ModuleTitle
              icon={Dumbbell}
              title="Hidratação"
              subtitle="Meta diária de água"
            />
            <WaterRing />
          </GlassCard>

          <GlassCard className="lg:col-span-2">
            <ModuleTitle
              icon={HeartPulse}
              title="Qualidade do Sono"
              subtitle="Fases do sono por noite · últimos 7 dias"
            />
            <SleepChart />
          </GlassCard>

          {/* Módulo de Esportes e Bem-estar */}
          <GlassCard>
            <ModuleTitle
              icon={Dumbbell}
              title="Esportes e Bem-estar"
              subtitle="Treinos e gasto calórico da semana"
            />
            <WorkoutChart />
          </GlassCard>
        </div>
      </main>
    </>
  );
}
