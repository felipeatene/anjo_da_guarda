import { NextResponse, type NextRequest } from "next/server";

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
  if (!token || !token.startsWith("adg_")) {
    return NextResponse.json({ error: "Token pessoal ausente ou inválido." }, { status: 401 });
  }

  // A validação do token e a persistência no Supabase entram aqui.
  return NextResponse.json({ received: true }, { status: 202 });
}
