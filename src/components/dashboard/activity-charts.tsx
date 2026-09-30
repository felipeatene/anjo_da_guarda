"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { waterWeek, workoutsWeek } from "@/lib/mock-data";

const tooltipStyle = {
  backgroundColor: "#101a33",
  border: "1px solid rgb(125 180 255 / 0.2)",
  borderRadius: "0.75rem",
  fontSize: "0.75rem",
  color: "#eef3fb",
};

export function WorkoutChart() {
  const totalCalories = workoutsWeek.reduce((sum, w) => sum + w.calories, 0);
  const activeDays = workoutsWeek.filter((w) => w.durationMin > 0).length;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-300">
          <span className="text-2xl font-extrabold text-mist-100">{totalCalories}</span>{" "}
          <span className="text-xs text-mist-500">kcal na semana</span>
        </p>
        <p className="text-xs text-mist-500">
          <span className="font-semibold text-tech-300">{activeDays} dias ativos</span>
        </p>
      </div>
      <div className="mt-4 h-44 flex-1" role="img" aria-label="Gráfico de gasto calórico por dia da semana">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workoutsWeek} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barCategoryGap="30%">
            <CartesianGrid stroke="rgb(139 155 184 / 0.12)" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#8b9bb8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#8b9bb8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgb(125 180 255 / 0.06)" }}
              formatter={(value, _name, item) => [
                `${value} kcal · ${(item.payload as { durationMin: number }).durationMin} min`,
                (item.payload as { type: string }).type,
              ]}
            />
            <Bar dataKey="calories" radius={[6, 6, 0, 0]} name="calories">
              {workoutsWeek.map((w) => (
                <Cell key={w.date} fill={w.durationMin > 0 ? "#1fc0ec" : "#26375e"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-[11px] text-mist-500">
        Registrado automaticamente pelo atalho de fim de treino do relógio
      </p>
    </div>
  );
}

export function WaterRing() {
  const today = waterWeek[waterWeek.length - 1];
  const percent = Math.min(100, Math.round((today.glasses / today.goal) * 100));
  const ringData = [
    { name: "consumido", value: percent },
    { name: "restante", value: 100 - percent },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div
        className="relative h-40 w-40"
        role="img"
        aria-label={`Hidratação de hoje: ${today.glasses} de ${today.goal} copos (${percent}%)`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ringData}
              dataKey="value"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              <Cell fill="#46d5f8" />
              <Cell fill="#1a2745" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-extrabold tabular-nums text-mist-100">
            {today.glasses}
            <span className="text-sm text-mist-500">/{today.goal}</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-tech-400">copos hoje</span>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-mist-500">
        {percent >= 100
          ? "Meta batida! Hidratação em dia."
          : `Faltam ${today.goal - today.glasses} copos para a meta diária.`}
      </p>
    </div>
  );
}
