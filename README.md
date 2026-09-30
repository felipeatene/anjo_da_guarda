# Anjo da Guarda 🛡️

> Uma iniciativa do **Coletivo Inspira** — hub que democratiza a automação de rotinas digitais com scripts e atalhos *plug and play* para usuários comuns.

Plataforma web completa: **Landing Page**, **autenticação com Token Pessoal** e **dashboard de monitoramento de saúde** ("Meu Anjo da Guarda"), construída com **Next.js (App Router) + TypeScript + TailwindCSS v4**, autenticação/banco via **Supabase** e gráficos com **Recharts**.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run lint       # ESLint
```

Sem variáveis de ambiente, a aplicação roda em **modo demonstração** (dados de exemplo + bypass de autenticação). Para ativar a autenticação real, crie `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-chave-anon>
```

---

## Arquitetura

```
src/
├── app/
│   ├── page.tsx              # Fase 1 — Landing Page
│   ├── login/page.tsx        # Fase 2 — Login / Cadastro (Supabase Auth)
│   ├── dashboard/page.tsx    # Fase 3 — Meu Anjo da Guarda (área logada)
│   └── api/
│       ├── token/route.ts    # POST — provisiona o Token Pessoal
│       └── ingest/route.ts   # POST — recebe os dados silenciosos dos atalhos
├── components/
│   ├── ui.tsx                # Design System: botões, glass cards, badges
│   ├── landing/              # Hero, catálogo filtrável, mockup do celular…
│   └── dashboard/            # Gráficos Recharts, timeline de alertas, token
└── lib/
    ├── supabase.ts           # Cliente Supabase (singleton)
    ├── token.ts              # Geração do Token Pessoal (adg_<hex>)
    ├── mock-data.ts          # Dados de demonstração
    └── types.ts              # Contratos de dados dos módulos
```

---

## Fase 1 — Idealização e Apresentação Web (Landing Page)

- **Hero** com proposta de valor, CTA duplo e métricas em cards de vidro (`components/landing/hero.tsx`).
- **Catálogo de automações** com **filtros dinâmicos** por categoria — Saúde, Esportes, Produtividade e Finanças (`components/landing/catalog.tsx`): estado `useState` + `useMemo` filtram a grade sem recarregar a página.
- **Mockup Interativo** (`components/landing/phone-mockup.tsx`): celular virtual 100% HTML/CSS (frame, notch, status bar) com **cenas animadas em loop** (crossfade a cada 3,2 s) demonstrando os atalhos. Para vídeos reais, basta substituir cada cena por:

```tsx
<video src="/demos/monitor-tosse.mp4" autoPlay muted loop playsInline
       className="absolute inset-0 h-full w-full object-cover" />
```

## Fase 2 — Sistema de Login e Autenticação

- Fluxo **Entrar / Criar conta** com Supabase Auth (`app/login/page.tsx`), com modo demonstração quando as credenciais não estão configuradas.
- Ao logar, o usuário recebe um **Token Pessoal** exclusivo (`adg_<48 hex>`, gerado via Web Crypto em `lib/token.ts`), exibido no painel com máscara, cópia e regeneração.
- Os atalhos do celular enviam dados **silenciosamente via API Web** — `POST /api/ingest` com JSON:

```json
{
  "token": "adg_…",
  "tipo": "tosse",
  "valor": 1,
  "capturado_em": "2026-09-30T03:42:00-03:00"
}
```

Em produção: validar o token contra a tabela `personal_tokens` (hash, nunca em claro) e persistir em `events` com RLS do Supabase.

## Fase 3 — Meu Anjo da Guarda (Dashboard de Monitoramento)

Área logada (`app/dashboard/page.tsx`) com layout imersivo em grid, composta por:

| Módulo | Componentes | Visualização |
| --- | --- | --- |
| **Sintomas e Alertas** | `cough-chart.tsx`, `alerts-timeline.tsx` | Área (tosse total × noturna) + timeline vertical de alertas aos responsáveis com status |
| **Sinais Vitais e Sono** | `heart-rate-chart.tsx`, `sleep-chart.tsx` | Linha de bpm ao longo do dia (leitura "ao vivo") + barras empilhadas das fases do sono |
| **Esportes e Bem-estar** | `activity-charts.tsx` | Barras de gasto calórico/treinos + anel radial de hidratação |

**Biblioteca de gráficos:** [Recharts](https://recharts.org) — escolhida por ser declarativa/componível (combina com React), responsiva via `<ResponsiveContainer>` e fácil de tematizar para o dark mode. Alternativa válida: Chart.js via `react-chartjs-2` (canvas, melhor para dezenas de milhares de pontos).

## Fase 4 — Design System "Incredible Design"

| Token | Valor | Significado |
| --- | --- | --- |
| `night-*` | `#060b18 → #26375e` | Superfícies escuras — **dark mode nativo** (dados médicos, menor fadiga visual) |
| `guard-*` | `#2f7df6` e variações | Azul guardião — **confiança** |
| `vital-*` | `#14cc92` e variações | Verde-menta — **saúde** |
| `tech-*` | `#1fc0ec` e variações | Ciano elétrico — **tecnologia** |
| `warn`/`danger` | `#fbbf24` / `#f43f5e` | Alertas e estados críticos |

- **Tipografia:** stack tipográfica com Inter (UI) e JetBrains Mono (dados sensíveis: bpm, tokens — `font-mono tabular-nums`), com fallback para as fontes nativas de cada plataforma.
- **Glassmorphism:** utilitários `.glass` / `.glass-strong` (`backdrop-blur` + bordas luminosas) e **cards flutuantes** `.card-float` com hover de elevação e *glow*.
- **Botões:** pílulas com gradiente `guard → vital`, variantes `primary` / `secondary` / `ghost`, foco visível (acessibilidade) em `components/ui.tsx`.
- **Mobile First:** grids `grid → sm:grid-cols-2 → lg:grid-cols-3`, navegação colapsável, tipografia fluida (`text-4xl sm:text-5xl xl:text-6xl`) e gráficos 100% responsivos. Respeito a `prefers-reduced-motion`.
- Os tokens vivem em `@theme` no `src/app/globals.css` (TailwindCSS v4, sem `tailwind.config.js`).

## Scripts

| Comando | Ação |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint (flat config do Next) |
