import { NextResponse } from "next/server";
import { generatePersonalToken } from "@/lib/token";

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
  const token = generatePersonalToken();
  return NextResponse.json({ token }, { status: 201 });
}
