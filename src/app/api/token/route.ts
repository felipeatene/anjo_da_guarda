import { NextResponse } from "next/server";
import { generatePersonalToken } from "@/lib/token";
import { getSupabaseServer } from "@/lib/supabase-server";
import { hashPersonalToken } from "@/lib/token-server";

/**
 * POST /api/token
 * Provisiona um novo Token Pessoal para o usuário autenticado.
 *
 * Em produção, este endpoint deve:
 *  1. Validar a sessão do usuário (Supabase Auth / cookie de sessão);
 *  2. Persistir o hash do token na tabela `personal_tokens` (nunca em claro);
 *  3. Invalidar tokens anteriores do mesmo usuário;
 *  4. Retornar o token uma única vez, para exibição no painel.
 */
export async function POST() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: "Autenticação não configurada." }, { status: 503 });
  }
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "É necessário entrar para gerar um token." }, { status: 401 });

  const token = generatePersonalToken();
  const tokenHash = await hashPersonalToken(token);
  const { error } = await supabase.from("personal_tokens").upsert(
    { user_id: user.id, token_hash: tokenHash, active: true },
    { onConflict: "user_id" }
  );
  if (error) return NextResponse.json({ error: "Não foi possível salvar o token." }, { status: 500 });
  return NextResponse.json({ token }, { status: 201 });
}
