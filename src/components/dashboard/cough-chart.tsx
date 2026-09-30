"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Wind } from "lucide-react";
import { coughWeek } from "@/lib/mock-data";

const tooltipStyle = {
  backgroundColor: "#101a33",
  border: "1px solid rgb(125 180 255 / 0.2)",
  borderRadius: "0.75rem",
  fontSize: "0.75rem",
  color: "#eef3fb",
};

export function CoughChart() {
  const total = coughWeek.reduce((sum, d) => sum + d.count, 0);
  const peak = coughWeek.reduce((max, d) => (d.count > max.count ? d : max), coughWeek[0]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-300">
          <span className="text-2xl font-extrabold text-mist-100">{total}</span> episódios na semana
        </p>
        <p className="text-xs text-mist-500">
          Pico: <span className="font-semibold text-warn-400">{peak.count} em {peak.date}</span>
        </p>
      </div>
      <div className="mt-4 h-44 flex-1" role="img" aria-label="Gráfico de episódios de tosse nos últimos 7 dias">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={coughWeek} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
            <defs>
              <linearGradient id="coughFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34e3ae" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#34e3ae" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgb(139 155 184 / 0.12)" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#8b9bb8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#8b9bb8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value, name) => [
                value,
                name === "count" ? "Episódios" : "Durante a madrugada",
              ]}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#34e3ae"
              strokeWidth={2.5}
              fill="url(#coughFill)"
              name="count"
            />
            <Area
              type="monotone"
              dataKey="nightCount"
              stroke="#2f7df6"
              strokeWidth={2}
              strokeDasharray="5 4"
              fill="transparent"
              name="nightCount"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-mist-500">
        <Wind className="size-3.5 text-vital-400" />
        Capturado pelo reconhecimento de som do aparelho durante a noite
      </p>
    </div>
  );
}
