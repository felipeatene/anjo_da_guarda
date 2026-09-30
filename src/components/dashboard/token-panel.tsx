"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Eye, EyeOff, KeyRound, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";

const ingestUrl = "/api/ingest";

export function TokenPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("adg-personal-token");
    if (storedToken) {
      queueMicrotask(() => setToken(storedToken));
      return;
    }
    void fetch("/api/token", { method: "POST" })
      .then(async (response) => {
        if (!response.ok) throw new Error("token provisioning failed");
        const data = (await response.json()) as { token: string };
        window.localStorage.setItem("adg-personal-token", data.token);
        setToken(data.token);
      })
      .catch(() => setToken(null));
  }, []);

  async function copyToken() {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function regenerate() {
    void fetch("/api/token", { method: "POST" })
      .then(async (response) => {
        if (!response.ok) throw new Error("token provisioning failed");
        const data = (await response.json()) as { token: string };
        window.localStorage.setItem("adg-personal-token", data.token);
        setToken(data.token);
        setCopied(false);
      })
      .catch(() => setCopied(false));
  }

  const masked = token ? `${token.slice(0, 8)}${"•".repeat(24)}${token.slice(-4)}` : "";

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-mist-300">
        <KeyRound className="size-4 text-guard-300" />
        Use este token no campo <span className="font-semibold text-mist-100">Token Pessoal</span> de cada atalho
        instalado no seu celular.
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-night-900/70 p-4 sm:flex-row sm:items-center">
        <code className="flex-1 break-all font-mono text-sm text-vital-300">
          {token ? (visible ? token : masked) : "gerando…"}
        </code>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ocultar token" : "Mostrar token"}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
          <Button variant="secondary" size="sm" onClick={copyToken}>
            {copied ? <Check className="size-4 text-vital-400" /> : <Copy className="size-4" />}
            {copied ? "Copiado!" : "Copiar"}
          </Button>
          <Button variant="ghost" size="sm" onClick={regenerate}>
            <RefreshCw className="size-4" /> Gerar novo
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-guard-500/20 bg-guard-500/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-guard-300">
          Como os atalhos enviam seus dados
        </p>
        <pre className="mt-2 overflow-x-auto font-mono text-[11px] leading-relaxed text-mist-300">
{`POST ${ingestUrl}
Content-Type: application/json

{
  "token": "<seu-token-pessoal>",
  "tipo": "tosse",
  "valor": 1,
  "capturado_em": "2026-09-30T03:42:00-03:00"
}`}
        </pre>
      </div>

      <p className="mt-auto text-[11px] leading-relaxed text-mist-500">
        O token é exclusivo e intransferível. Se suspeitar de uso indevido, gere um novo — o anterior é
        invalidado imediatamente.
      </p>
    </div>
  );
}
