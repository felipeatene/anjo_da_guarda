/**
 * Gera o Token Pessoal do usuário, usado para autenticar os atalhos
 * do celular ao enviar dados (POST JSON) para a API do Anjo da Guarda.
 * Formato: adg_<48 caracteres hexadecimais>
 */
export function generatePersonalToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `adg_${hex}`;
}
