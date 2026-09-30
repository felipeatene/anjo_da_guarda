"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { heartRateToday } from "@/lib/mock-data";

const tooltipStyle = {
  backgroundColor: "#101a33",
  border: "1px solid rgb(125 180 255 / 0.2)",
  borderRadius: "0.75rem",
  fontSize: "0.75rem",
  color: "#eef3fb",
};

export function HeartRateChart() {
  const latest = heartRateToday[heartRateToday.length - 1];
  const [displayed, setDisplayed] = useState(latest.bpm);

  // Simula a leitura "ao vivo" vinda do relógio inteligente
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayed(latest.bpm + Math.round(Math.random() * 6 - 3));
    }, 2400);
    return () => clearInterval(timer);
  }, [latest.bpm]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-end justify-between">
        <p className="text-sm text-mist-300">
          <span className="font-mono text-3xl font-extrabold tabular-nums text-mist-100">{displayed}</span>{" "}
          <span className="text-xs font-semibold uppercase tracking-wider text-danger-400">bpm agora</span>
        </p>
        <p className="text-xs text-mist-500">
          Repouso: <span className="font-semibold text-mist-300">{latest.resting} bpm</span>
        </p>
      </div>
      <div className="mt-4 h-44 flex-1" role="img" aria-label="Gráfico de batimentos cardíacos ao longo do dia">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={heartRateToday} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
            <CartesianGrid stroke="rgb(139 155 184 / 0.12)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: "#8b9bb8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[40, 130]}
              tick={{ fill: "#8b9bb8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value, name) => [value, name === "bpm" ? "Frequência" : "Repouso"]}
            />
            <Line
              type="monotone"
              dataKey="bpm"
              stroke="#fb7185"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "#fb7185" }}
              name="bpm"
            />
            <Line
              type="monotone"
              dataKey="resting"
              stroke="#8b9bb8"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
              name="resting"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
