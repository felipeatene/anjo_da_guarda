import { BellRing, HeartPulse, Pill, Wind, type LucideIcon } from "lucide-react";
import { alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeConfig: Record<string, { icon: LucideIcon; tone: string; dot: string }> = {
  tosse: { icon: Wind, tone: "text-vital-300", dot: "bg-vital-400" },
  frequencia: { icon: HeartPulse, tone: "text-danger-400", dot: "bg-danger-400" },
  medicacao: { icon: Pill, tone: "text-guard-300", dot: "bg-guard-400" },
  queda: { icon: BellRing, tone: "text-warn-400", dot: "bg-warn-400" },
};

const statusLabel: Record<string, string> = {
  enviado: "Enviado",
  visualizado: "Visualizado",
  pendente: "Pendente",
};

export function AlertsTimeline() {
  return (
    <ol className="relative flex flex-col gap-5 border-l border-white/10 pl-6">
      {alerts.map((alert) => {
        const config = typeConfig[alert.type];
        const Icon = config.icon;
        return (
          <li key={alert.id} className="relative">
            <span
              className={cn(
                "absolute -left-[31px] grid size-5 place-items-center rounded-full border border-night-950",
                config.dot
              )}
              aria-hidden="true"
            >
              <Icon className="size-3 text-night-950" strokeWidth={2.6} />
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-mist-500">{alert.timestamp}</p>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  alert.status === "visualizado"
                    ? "bg-vital-500/15 text-vital-300"
                    : alert.status === "enviado"
                      ? "bg-guard-500/15 text-guard-300"
                      : "bg-warn-400/15 text-warn-400"
                )}
              >
                {statusLabel[alert.status]}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-mist-100">{alert.message}</p>
            <p className={cn("mt-0.5 text-xs", config.tone)}>Destino: {alert.sentTo}</p>
          </li>
        );
      })}
    </ol>
  );
}
