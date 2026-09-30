import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anjo da Guarda — Automação plug and play para a sua rotina",
    template: "%s · Anjo da Guarda",
  },
  description:
    "Hub do Coletivo Inspira que democratiza a automação de rotinas digitais: scripts e atalhos plug and play de saúde, esportes, produtividade e finanças, com monitoramento inteligente no seu painel pessoal.",
  keywords: ["automação", "atalhos", "saúde", "monitoramento", "Coletivo Inspira", "Anjo da Guarda"],
};

export const viewport: Viewport = {
  themeColor: "#060b18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-night-950 text-mist-100">{children}</body>
    </html>
  );
}
