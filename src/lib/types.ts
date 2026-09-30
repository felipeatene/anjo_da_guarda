export type AutomationCategory = "saude" | "esportes" | "produtividade" | "financas";

export interface Automation {
  id: string;
  name: string;
  description: string;
  category: AutomationCategory;
  icon: string;
  platform: "iOS" | "Android" | "Ambos";
  setupTime: string;
  sendsData: boolean;
  popularity: number;
}

export interface CoughEvent {
  date: string;
  count: number;
  nightCount: number;
}

export interface AlertEvent {
  id: string;
  timestamp: string;
  type: "tosse" | "queda" | "frequencia" | "medicacao";
  message: string;
  sentTo: string;
  status: "enviado" | "visualizado" | "pendente";
}

export interface HeartRatePoint {
  time: string;
  bpm: number;
  resting: number;
}

export interface SleepNight {
  date: string;
  deep: number;
  light: number;
  rem: number;
  awake: number;
  score: number;
}

export interface WorkoutEntry {
  date: string;
  type: string;
  durationMin: number;
  calories: number;
}

export interface WaterEntry {
  date: string;
  glasses: number;
  goal: number;
}
