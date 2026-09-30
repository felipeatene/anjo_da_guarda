import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { hashPersonalToken } from "@/lib/token-server";

/**
 * POST /api/ingest
 * Endpoint silencioso que recebe os registros enviados pelos atalhos
 * do celular do usuário (método POST, corpo JSON).
 *
 * Autenticação: header Authorization (esquema Bearer) ou campo `token`
 * no corpo da requisição.
 *
 * Exemplo de corpo enviado por um atalho de saúde:
 * {
 *   "token": "adg_...",
 *   "tipo": "tosse",
 *   "valor": 1,
 *   "origem": "ios-shortcut",
 *   "capturado_em": "2026-09-30T03:42:00-03:00"
 * }
 *
 * Em produção, o handler deve validar o token contra a tabela
 * `personal_tokens` (Supabase) e persistir o evento na tabela `events`.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição deve ser JSON válido." }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const bodyToken =
    typeof body === "object" && body !== null && "token" in body && typeof body.token === "string"
      ? body.token
      : null;

  const token = bearerToken ?? bodyToken;
  if (!token || !/^adg_[0-9a-f]{48}$/.test(token)) {
    return NextResponse.json({ error: "Token pessoal ausente ou inválido." }, { status: 401 });
  }
  if (
    typeof body !== "object" ||
    body === null ||
    !("tipo" in body) ||
    typeof body.tipo !== "string" ||
    !body.tipo ||
    !("valor" in body) ||
    typeof body.valor !== "number" ||
    !Number.isFinite(body.valor) ||
    !("capturado_em" in body) ||
    typeof body.capturado_em !== "string" ||
    Number.isNaN(Date.parse(body.capturado_em))
  ) {
    return NextResponse.json({ error: "Payload de evento inválido." }, { status: 400 });
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await getSupabaseServer();
    const { data: tokenRecord } = await supabase
      .from("personal_tokens")
      .select("user_id")
      .eq("token_hash", await hashPersonalToken(token))
      .eq("active", true)
      .maybeSingle();
    if (!tokenRecord) return NextResponse.json({ error: "Token pessoal inválido." }, { status: 401 });
  } else {
    return NextResponse.json({ error: "Autenticação não configurada." }, { status: 503 });
  }

  return NextResponse.json({ received: true }, { status: 202 });
}
