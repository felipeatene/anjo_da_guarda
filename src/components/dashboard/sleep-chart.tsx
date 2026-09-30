"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { sleepWeek } from "@/lib/mock-data";

const tooltipStyle = {
  backgroundColor: "#101a33",
  border: "1px solid rgb(125 180 255 / 0.2)",
  borderRadius: "0.75rem",
  fontSize: "0.75rem",
  color: "#eef3fb",
};

const stageLabels: Record<string, string> = {
  deep: "Profundo",
  light: "Leve",
  rem: "REM",
  awake: "Acordado",
};

export function SleepChart() {
  const lastNight = sleepWeek[sleepWeek.length - 1];
  const avgScore = Math.round(sleepWeek.reduce((sum, n) => sum + n.score, 0) / sleepWeek.length);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-300">
          Score médio: <span className="text-2xl font-extrabold text-mist-100">{avgScore}</span>
          <span className="text-xs text-mist-500">/100</span>
        </p>
        <p className="text-xs text-mist-500">
          Última noite: <span className="font-semibold text-vital-300">{lastNight.score} pontos</span>
        </p>
      </div>
      <div className="mt-4 h-44 flex-1" role="img" aria-label="Gráfico de fases do sono nos últimos 7 dias">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sleepWeek} margin={{ top: 4, right: 4, bottom: 0, left: -24 }} barCategoryGap="28%">
            <CartesianGrid stroke="rgb(139 155 184 / 0.12)" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#8b9bb8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: "#8b9bb8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}h`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgb(125 180 255 / 0.06)" }}
              formatter={(value, name) => [`${value}h`, stageLabels[name as string] ?? name]}
            />
            <Bar dataKey="deep" stackId="sleep" fill="#2f7df6" radius={[0, 0, 0, 0]} name="deep" />
            <Bar dataKey="light" stackId="sleep" fill="#46d5f8" name="light" />
            <Bar dataKey="rem" stackId="sleep" fill="#34e3ae" name="rem" />
            <Bar dataKey="awake" stackId="sleep" fill="#fbbf24" radius={[4, 4, 0, 0]} name="awake" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-mist-500">
        {Object.entries(stageLabels).map(([key, label]) => (
          <span key={key} className="inline-flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{
                backgroundColor:
                  key === "deep" ? "#2f7df6" : key === "light" ? "#46d5f8" : key === "rem" ? "#34e3ae" : "#fbbf24",
              }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
