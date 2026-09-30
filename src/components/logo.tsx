import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-guard-500 to-vital-500 shadow-glow">
        <ShieldCheck className="size-5 text-white" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-mist-100">Anjo da Guarda</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-mist-500">
          Coletivo Inspira
        </span>
      </span>
    </span>
  );
}
