"use client";

import { useEffect, useState } from "react";
import { Activity, Droplets, Moon, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mockup Interativo — celular virtual em HTML/CSS puro.
 * Os "vídeos curtos" são cenas animadas em loop que demonstram
 * os atalhos funcionando. Para usar vídeos reais, basta trocar o
 * conteúdo de cada cena por:
 *
 *   <video src="/demos/monitor-tosse.mp4" autoPlay muted loop playsInline
 *          className="absolute inset-0 h-full w-full object-cover" />
 */

const scenes = [
  {
    id: "tosse",
    label: "Monitor de Tosse",
    icon: Wind,
    accent: "text-vital-400",
    ring: "bg-vital-400",
    title: "Tosse detectada",
    subtitle: "Episódio registrado · 03:42",
    detail: "Padrão persistente — alerta enviado à responsável",
  },
  {
    id: "cardio",
    label: "Sinais Vitais",
    icon: Activity,
    accent: "text-danger-400",
    ring: "bg-danger-400",
    title: "118 bpm",
    subtitle: "Frequência em repouso elevada",
    detail: "Sincronizado do relógio · há 2 min",
  },
  {
    id: "sono",
    label: "Qualidade do Sono",
    icon: Moon,
    accent: "text-guard-300",
    ring: "bg-guard-400",
    title: "Sono profundo 2h00",
    subtitle: "Score da noite: 88/100",
    detail: "Melhor noite da semana",
  },
  {
    id: "agua",
    label: "Hidratação",
    icon: Droplets,
    accent: "text-tech-400",
    ring: "bg-tech-400",
    title: "+1 copo registrado",
    subtitle: "6 de 8 copos hoje",
    detail: "Faltam 400 ml para a meta",
  },
];

const SCENE_MS = 3200;

function SceneContent({ scene }: { scene: (typeof scenes)[number] }) {
  const Icon = scene.icon;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <span className={cn("size-16 rounded-full animate-pulse-ring", scene.ring, "grid place-items-center")}>
        <Icon className="size-7 text-night-950" strokeWidth={2.4} />
      </span>
      <div>
        <p className="text-lg font-bold text-mist-100">{scene.title}</p>
        <p className={cn("mt-1 text-xs font-semibold", scene.accent)}>{scene.subtitle}</p>
      </div>
      <p className="rounded-xl bg-white/5 px-3 py-2 text-[11px] leading-snug text-mist-300">{scene.detail}</p>
      {/* Barras simulando waveform do reconhecimento de som */}
      <div className="flex h-8 items-end gap-1" aria-hidden="true">
        {[10, 22, 14, 30, 18, 26, 12, 24, 16, 28, 8, 20].map((h, i) => (
          <span
            key={i}
            className={cn("w-1 rounded-full animate-pulse", scene.ring)}
            style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function PhoneMockup() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setAutoplay(!mediaQuery.matches);
    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);
    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % scenes.length), SCENE_MS);
    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Frame do celular */}
      <div className="relative animate-float">
        <div className="absolute -inset-6 rounded-[3.5rem] bg-gradient-to-br from-guard-500/25 via-transparent to-vital-500/25 blur-2xl" aria-hidden="true" />
        <div className="relative h-[540px] w-[264px] rounded-[2.8rem] border border-white/15 bg-night-900 p-2.5 shadow-float sm:h-[600px] sm:w-[294px]">
          {/* Notch / Dynamic Island */}
          <div className="absolute left-1/2 top-5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-night-950" aria-hidden="true" />
          {/* Tela */}
          <div className="glass-strong relative h-full w-full overflow-hidden rounded-[2.2rem]">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-mist-300">
              <span>21:47</span>
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="inline-block h-1.5 w-3 rounded-sm bg-vital-400" />
                5G
              </span>
            </div>
            {/* Cenas em loop com crossfade */}
            <div className="relative h-[calc(100%-2rem)]">
              {scenes.map((scene, i) => (
                <div
                  key={scene.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    i === active ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                  aria-hidden={i !== active}
                >
                  <SceneContent scene={scene} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de cenas */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {scenes.map((scene, i) => {
          const Icon = scene.icon;
          return (
            <button
              key={scene.id}
              onClick={() => {
                setActive(i);
                setAutoplay(false);
              }}
              aria-pressed={i === active}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300",
                i === active
                  ? "border-vital-400/40 bg-vital-500/15 text-vital-300"
                  : "border-white/10 bg-white/5 text-mist-500 hover:text-mist-300"
              )}
            >
              <Icon className="size-3.5" />
              {scene.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
