import { Download, KeyRound, LineChart } from "lucide-react";
import { GlassCard, SectionHeading } from "@/components/ui";

const steps = [
  {
    icon: Download,
    title: "1. Instale o atalho",
    description:
      "Escolha no catálogo e instale no celular em poucos minutos, com tutorial guiado passo a passo. Sem código, sem complicação.",
  },
  {
    icon: KeyRound,
    title: "2. Conecte seu Token Pessoal",
    description:
      "Ao criar sua conta, você recebe um token exclusivo. Cole-o uma única vez no atalho e seus dados passam a fluir com segurança via API.",
  },
  {
    icon: LineChart,
    title: "3. Acompanhe tudo no painel",
    description:
      "Sintomas, sinais vitais, sono e treinos aparecem automaticamente no Meu Anjo da Guarda — e os alertas chegam a quem você confia.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Como funciona"
        title={
          <>
            Do seu bolso para o painel, <span className="text-gradient">em silêncio</span>
          </>
        }
        description="Três passos e o seu Anjo da Guarda já está de plantão — coletando, organizando e protegendo."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }) => (
          <GlassCard key={title} className="relative overflow-hidden">
            <div
              className="absolute -right-8 -top-8 size-32 rounded-full bg-guard-500/10 blur-2xl"
              aria-hidden="true"
            />
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-guard-500 to-vital-500 shadow-glow">
              <Icon className="size-6 text-white" strokeWidth={2.2} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-mist-100">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">{description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
