import type {
  AlertEvent,
  Automation,
  CoughEvent,
  HeartRatePoint,
  SleepNight,
  WaterEntry,
  WorkoutEntry,
} from "./types";

export const automations: Automation[] = [
  {
    id: "monitor-tosse",
    name: "Monitor de Tosse",
    description:
      "Detecta episódios de tosse durante a noite via reconhecimento de som do aparelho e registra no painel. Em padrões persistentes, dispara alerta aos responsáveis.",
    category: "saude",
    icon: "stethoscope",
    platform: "Ambos",
    setupTime: "3 min",
    sendsData: true,
    popularity: 98,
  },
  {
    id: "alerta-responsavel",
    name: "Alerta ao Responsável",
    description:
      "Envia notificação silenciosa para familiares quando sinais anormais são detectados: quedas, frequência cardíaca fora da faixa ou tosse persistente.",
    category: "saude",
    icon: "bell-ring",
    platform: "Ambos",
    setupTime: "2 min",
    sendsData: true,
    popularity: 96,
  },
  {
    id: "lembrete-medicacao",
    name: "Lembrete de Medicação",
    description:
      "Lembretes inteligentes de remédios com confirmação de dose tomada e registro de adesão no histórico de saúde.",
    category: "saude",
    icon: "pill",
    platform: "Ambos",
    setupTime: "4 min",
    sendsData: true,
    popularity: 91,
  },
  {
    id: "fim-de-treino",
    name: "Registro de Fim de Treino",
    description:
      "Ao encerrar o treino no relógio, registra automaticamente duração, calorias e tipo de atividade no seu painel de bem-estar.",
    category: "esportes",
    icon: "activity",
    platform: "Ambos",
    setupTime: "2 min",
    sendsData: true,
    popularity: 88,
  },
  {
    id: "hidratacao",
    name: "Controle de Hidratação",
    description:
      "Um toque no atalho registra cada copo de água. Acompanhe sua meta diária e receba lembretes nos horários certos.",
    category: "esportes",
    icon: "droplets",
    platform: "Ambos",
    setupTime: "1 min",
    sendsData: true,
    popularity: 85,
  },
  {
    id: "modo-foco",
    name: "Modo Foco Automático",
    description:
      "Ative o foco profundo: silencia notificações, inicia um timer Pomodoro e registra suas sessões de produtividade.",
    category: "produtividade",
    icon: "timer",
    platform: "iOS",
    setupTime: "2 min",
    sendsData: false,
    popularity: 90,
  },
  {
    id: "resumo-diario",
    name: "Resumo do Dia",
    description:
      "Toda noite, receba um resumo falado das tarefas concluídas, dos compromissos de amanhã e da previsão do tempo.",
    category: "produtividade",
    icon: "sun",
    platform: "Ambos",
    setupTime: "3 min",
    sendsData: false,
    popularity: 82,
  },
  {
    id: "registro-gastos",
    name: "Registro Rápido de Gastos",
    description:
      "Toque no atalho, fale o valor e a categoria. Seus gastos são registrados e categorizados automaticamente.",
    category: "financas",
    icon: "wallet",
    platform: "Ambos",
    setupTime: "3 min",
    sendsData: true,
    popularity: 87,
  },
  {
    id: "alerta-fatura",
    name: "Alerta de Fatura",
    description:
      "Receba aviso quando a fatura do cartão fechar e um resumo dos maiores gastos do mês, direto no painel.",
    category: "financas",
    icon: "credit-card",
    platform: "Android",
    setupTime: "5 min",
    sendsData: true,
    popularity: 79,
  },
];

export const categoryLabels: Record<string, string> = {
  todos: "Todos",
  saude: "Saúde",
  esportes: "Esportes",
  produtividade: "Produtividade",
  financas: "Finanças",
};

export const coughWeek: CoughEvent[] = [
  { date: "24/09", count: 4, nightCount: 3 },
  { date: "25/09", count: 6, nightCount: 5 },
  { date: "26/09", count: 12, nightCount: 9 },
  { date: "27/09", count: 18, nightCount: 14 },
  { date: "28/09", count: 15, nightCount: 11 },
  { date: "29/09", count: 8, nightCount: 6 },
  { date: "30/09", count: 5, nightCount: 4 },
];

export const alerts: AlertEvent[] = [
  {
    id: "a1",
    timestamp: "28/09 · 03:42",
    type: "tosse",
    message: "Tosse persistente detectada por 40 min durante a madrugada",
    sentTo: "Maria (mãe)",
    status: "visualizado",
  },
  {
    id: "a2",
    timestamp: "27/09 · 22:15",
    type: "frequencia",
    message: "Frequência cardíaca em repouso acima de 110 bpm por 15 min",
    sentTo: "Maria (mãe)",
    status: "visualizado",
  },
  {
    id: "a3",
    timestamp: "27/09 · 08:00",
    type: "medicacao",
    message: "Dose da manhã confirmada com 25 min de atraso",
    sentTo: "Registro interno",
    status: "enviado",
  },
  {
    id: "a4",
    timestamp: "26/09 · 02:10",
    type: "tosse",
    message: "Aumento de 3x nos episódios de tosse noturna vs. média semanal",
    sentTo: "Maria (mãe)",
    status: "enviado",
  },
];

export const heartRateToday: HeartRatePoint[] = [
  { time: "00h", bpm: 58, resting: 60 },
  { time: "03h", bpm: 55, resting: 60 },
  { time: "06h", bpm: 62, resting: 60 },
  { time: "09h", bpm: 78, resting: 60 },
  { time: "12h", bpm: 84, resting: 60 },
  { time: "15h", bpm: 92, resting: 60 },
  { time: "18h", bpm: 118, resting: 60 },
  { time: "21h", bpm: 74, resting: 60 },
];

export const sleepWeek: SleepNight[] = [
  { date: "24/09", deep: 1.8, light: 3.9, rem: 1.5, awake: 0.4, score: 82 },
  { date: "25/09", deep: 1.5, light: 4.2, rem: 1.3, awake: 0.6, score: 74 },
  { date: "26/09", deep: 1.2, light: 4.0, rem: 1.1, awake: 1.1, score: 61 },
  { date: "27/09", deep: 1.0, light: 3.8, rem: 0.9, awake: 1.5, score: 52 },
  { date: "28/09", deep: 1.4, light: 4.1, rem: 1.2, awake: 0.9, score: 68 },
  { date: "29/09", deep: 1.7, light: 3.7, rem: 1.4, awake: 0.5, score: 79 },
  { date: "30/09", deep: 2.0, light: 3.5, rem: 1.6, awake: 0.3, score: 88 },
];

export const workoutsWeek: WorkoutEntry[] = [
  { date: "24/09", type: "Caminhada", durationMin: 32, calories: 180 },
  { date: "25/09", type: "Musculação", durationMin: 45, calories: 290 },
  { date: "26/09", type: "Descanso", durationMin: 0, calories: 0 },
  { date: "27/09", type: "Corrida", durationMin: 28, calories: 340 },
  { date: "28/09", type: "Natação", durationMin: 40, calories: 410 },
  { date: "29/09", type: "Caminhada", durationMin: 25, calories: 150 },
  { date: "30/09", type: "Musculação", durationMin: 50, calories: 320 },
];

export const waterWeek: WaterEntry[] = [
  { date: "24/09", glasses: 7, goal: 8 },
  { date: "25/09", glasses: 8, goal: 8 },
  { date: "26/09", glasses: 5, goal: 8 },
  { date: "27/09", glasses: 6, goal: 8 },
  { date: "28/09", glasses: 9, goal: 8 },
  { date: "29/09", glasses: 8, goal: 8 },
  { date: "30/09", glasses: 6, goal: 8 },
];
