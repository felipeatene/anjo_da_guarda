import { ArrowRight, HeartPulse, Play, ShieldCheck, Smartphone } from "lucide-react";
import { Badge, ButtonLink } from "@/components/ui";
import { PhoneMockup } from "./phone-mockup";

const stats = [
  { icon: Smartphone, value: "9+", label: "automações prontas" },
  { icon: HeartPulse, value: "24/7", label: "monitoramento silencioso" },
  { icon: ShieldCheck, value: "0", label: "linhas de código para você" },
];

export function Hero() {
  return (
    <section className="hero-aurora relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-2 lg:pt-40">
        {/* Proposta de valor */}
        <div className="text-center lg:text-left">
          <Badge tone="vital" className="mx-auto lg:mx-0">
            <span className="size-1.5 rounded-full bg-vital-400" />
            Uma iniciativa do Coletivo Inspira
          </Badge>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-mist-100 sm:text-5xl xl:text-6xl">
            Um <span className="text-gradient">Anjo da Guarda</span> digital cuidando da sua rotina
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mist-300 lg:mx-0">
            Automatize saúde, esportes, produtividade e finanças com atalhos plug and play. Seu celular
            vigia seus sinais vitais, registra tudo em silêncio e alerta quem você ama quando importa.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href="/login" size="lg">
              Começar agora <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#demo" variant="secondary" size="lg">
              <Play className="size-4" /> Ver funcionando
            </ButtonLink>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass rounded-2xl px-3 py-4 text-center lg:text-left">
                <Icon className="mx-auto size-5 text-guard-300 lg:mx-0" />
                <dt className="sr-only">{label}</dt>
                <dd className="mt-2 text-2xl font-extrabold text-mist-100">{value}</dd>
                <dd className="mt-1 text-[11px] font-medium leading-tight text-mist-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Mockup interativo */}
        <div id="demo" className="scroll-mt-28">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
