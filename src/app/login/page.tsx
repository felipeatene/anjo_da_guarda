"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, LogIn, UserPlus } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured) {
        // Modo demonstração: sem Supabase configurado, segue para o painel
        // para permitir a exploração da interface.
        router.push("/dashboard");
        return;
      }

      const supabase = getSupabase();
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (signUpError) throw signUpError;
        // O Token Pessoal é provisionado automaticamente no cadastro
        // (trigger no banco) e fica disponível no painel, na aba "Meu Token".
        router.push("/dashboard");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível concluir o acesso. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-night-900/80 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-500 outline-none transition-colors focus:border-guard-400/60 focus:ring-2 focus:ring-guard-500/20";

  return (
    <main className="hero-aurora flex min-h-dvh flex-1 flex-col items-center justify-center px-5 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-mist-500 transition-colors hover:text-mist-100"
      >
        <ArrowLeft className="size-4" /> Voltar para a apresentação
      </Link>

      <div className="glass-strong card-float w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-mist-100">
            {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h1>
          <p className="mt-2 text-sm text-mist-300">
            {mode === "login"
              ? "Acesse o Meu Anjo da Guarda e acompanhe seus registros."
              : "Ao criar a conta, seu Token Pessoal é gerado automaticamente para conectar os atalhos do seu celular."}
          </p>
        </div>

        {/* Alternância login / cadastro */}
        <div className="mt-7 grid grid-cols-2 rounded-full border border-white/10 bg-night-900/70 p-1" role="tablist">
          {(["login", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setError(null);
                setNotice(null);
              }}
              className={cn(
                "cursor-pointer rounded-full py-2 text-sm font-semibold transition-all duration-300",
                mode === m ? "bg-gradient-to-r from-guard-500 to-vital-500 text-white shadow-glow" : "text-mist-400 hover:text-mist-100"
              )}
            >
              {m === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {mode === "signup" && (
            <label className="flex flex-col gap-1.5 text-sm font-medium text-mist-300">
              Nome completo
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como devemos te chamar?"
                className={inputClass}
                autoComplete="name"
              />
            </label>
          )}
          <label className="flex flex-col gap-1.5 text-sm font-medium text-mist-300">
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              className={inputClass}
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-mist-300">
            Senha
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
              className={inputClass}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className="rounded-xl border border-vital-500/30 bg-vital-500/10 px-4 py-3 text-sm text-vital-300">
              {notice}
            </p>
          )}

          <Button type="submit" size="lg" disabled={loading} className="mt-1 w-full">
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : mode === "login" ? (
              <LogIn className="size-4" />
            ) : (
              <UserPlus className="size-4" />
            )}
            {mode === "login" ? "Entrar no painel" : "Criar conta e gerar meu token"}
          </Button>
        </form>

        {!isSupabaseConfigured && (
          <p className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xs leading-relaxed text-mist-500">
            Modo demonstração: configure <code className="font-mono text-mist-300">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code className="font-mono text-mist-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para ativar a autenticação real.
          </p>
        )}
      </div>
    </main>
  );
}
