"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Database,
  FileText,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

type Language = "pt" | "en";

const STORAGE_KEY = "critix-vault-policies-language";

const APP_INFO = {
  name: "Critix Vault",
  identifier: "com.walla.critix-vault",
  platform: "Desktop (Windows)",
  bundleTarget: "NSIS",
  localDatabase: "SQLite (Prisma)",
};

type PoliciesTermsContentProps = {
  msStoreUrl: string;
  repoUrl: string;
  lastUpdated: string;
};

type Copy = {
  back: string;
  badge: string;
  title: string;
  description: string;
  updated: string;
  microsoftSection: string;
  overview: string;
  cards: {
    appName: string;
    identifier: string;
    platform: string;
    packageType: string;
  };
  capabilitiesTitle: string;
  capabilities: string[];
  officialLinks: string;
  storeText: string;
  repoText: string;
  andConnector: string;
  privacySection: string;
  privacyBlocks: Array<{ title: string; items: string[] }>;
  termsSection: string;
  termsBlocks: Array<{ title: string; items: string[] }>;
  transparencySection: string;
  transparencyCards: Array<{ title: string; body: string }>;
  metadataSources: string;
};

const copyByLanguage: Record<Language, Copy> = {
  pt: {
    back: "Voltar para landing do Critix Vault",
    badge: "Compliance e transparencia",
    title: "Critix Vault: Policies, Terms & Privacy",
    description:
      "Esta pagina centraliza as informacoes exigidas para publicacao na Microsoft Store e descreve, com clareza, como o Critix Vault opera, quais dados sao processados e como o usuario controla seu conteudo.",
    updated: "Ultima atualizacao",
    microsoftSection: "Informacoes para Microsoft Store",
    overview:
      "O Critix Vault e um aplicativo desktop para organizar bibliotecas locais de videos (filmes, series, temporadas e episodios), com enriquecimento de metadados e visual de plataforma de streaming.",
    cards: {
      appName: "Nome do app",
      identifier: "Identificador",
      platform: "Plataforma alvo",
      packageType: "Empacotamento",
    },
    capabilitiesTitle: "Capacidades e comportamento do app",
    capabilities: [
      "Seleciona pastas locais por dialogo nativo para montar a biblioteca do usuario.",
      "Escaneia recursivamente arquivos de video locais para identificar conteudo.",
      "Armazena dados localmente em SQLite (Prisma).",
      "Consome metadados externos via Critix API e TMDB para enriquecer titulos, sinopses e imagens.",
      "Permite abrir arquivos no player padrao do sistema ou VLC (quando configurado).",
    ],
    officialLinks: "URLs oficiais:",
    storeText: "Microsoft Store",
    repoText: "Repositorio do projeto",
    andConnector: "e",
    privacySection: "Politica de Privacidade",
    privacyBlocks: [
      {
        title: "1. Dados coletados e armazenados localmente",
        items: [
          "Nomes e caminhos de pastas adicionadas pelo usuario.",
          "Caminhos de arquivos de midia identificados no dispositivo local.",
          "Metadados de filmes e series (titulos, capas, sinopses, episodios e afins).",
          "Historico de reproducao (progresso, concluido, data/hora de assistido).",
          "Historico tecnico de navegacao interna para continuidade de uso.",
        ],
      },
      {
        title: "2. Compartilhamento e trafego externo",
        items: [
          "O app consulta APIs externas de metadados para enriquecer sua biblioteca local.",
          "As consultas sao restritas a rotas tecnicas de status e metadados de midia.",
          "Nao ha venda de dados pessoais e nao ha SDK de anuncios no app.",
        ],
      },
      {
        title: "3. Backup, restauracao e controle do usuario",
        items: [
          "O usuario pode exportar backup local em JSON com dados da biblioteca.",
          "O usuario pode importar backup para restaurar o estado do app.",
          "Tambem e possivel apagar todos os dados da aplicacao pelas configuracoes.",
        ],
      },
    ],
    termsSection: "Termos de Uso",
    termsBlocks: [
      {
        title: "1. Finalidade do software",
        items: [
          "O Critix Vault e destinado a organizacao de acervo de video local do proprio usuario.",
          "O app nao fornece, hospeda ou distribui conteudo audiovisual protegido por direitos autorais.",
        ],
      },
      {
        title: "2. Responsabilidade do usuario",
        items: [
          "O usuario e responsavel pela legalidade do conteudo local gerenciado no app.",
          "O usuario e responsavel por backups e guarda de dados exportados.",
          "O uso de APIs de terceiros segue os termos de cada provedor.",
        ],
      },
      {
        title: "3. Disponibilidade e alteracoes",
        items: [
          "Recursos podem ser alterados conforme evolucao tecnica do produto.",
          "Integracoes externas podem sofrer indisponibilidade por fatores fora do controle do app.",
          "Esta pagina pode ser atualizada para refletir novas funcionalidades e requisitos legais.",
        ],
      },
    ],
    transparencySection: "Transparencia Tecnica (Como o app funciona)",
    transparencyCards: [
      {
        title: "Camada local",
        body: "Banco SQLite local com Prisma para persistencia de biblioteca, episodios, historico e preferencias.",
      },
      {
        title: "Integracao externa",
        body: "Consulta metadados de midia em APIs externas para enriquecer o catalogo local.",
      },
      {
        title: "Governanca",
        body: "O usuario mantem controle dos dados por backup, restauracao e limpeza total da base local.",
      },
    ],
    metadataSources: "Critix API e TMDB",
  },
  en: {
    back: "Back to Critix Vault landing",
    badge: "Compliance and transparency",
    title: "Critix Vault: Policies, Terms & Privacy",
    description:
      "This page centralizes Microsoft Store publication information and clearly explains how Critix Vault works, what data is processed, and how users control their own content.",
    updated: "Last update",
    microsoftSection: "Microsoft Store Information",
    overview:
      "Critix Vault is a desktop application that organizes local video libraries (movies, series, seasons, and episodes) with metadata enrichment and a streaming-inspired interface.",
    cards: {
      appName: "App name",
      identifier: "Identifier",
      platform: "Target platform",
      packageType: "Packaging",
    },
    capabilitiesTitle: "App capabilities and behavior",
    capabilities: [
      "Selects local folders through native dialogs to build the user library.",
      "Recursively scans local video files to identify media content.",
      "Stores data locally in SQLite (Prisma).",
      "Consumes external metadata via Critix API and TMDB to enrich titles, overviews and artwork.",
      "Can open media files with the system default player or VLC (when configured).",
    ],
    officialLinks: "Official links:",
    storeText: "Microsoft Store",
    repoText: "Project repository",
    andConnector: "and",
    privacySection: "Privacy Policy",
    privacyBlocks: [
      {
        title: "1. Data collected and stored locally",
        items: [
          "Folder names and paths added by the user.",
          "Local media file paths identified on the device.",
          "Movie and series metadata (titles, artwork, overviews, episodes, etc.).",
          "Watch history (progress, completion status, watched timestamp).",
          "Technical navigation history used for continuity of the experience.",
        ],
      },
      {
        title: "2. External traffic and sharing",
        items: [
          "The app queries external metadata APIs to enrich the local library.",
          "Requests are limited to technical status and media metadata routes.",
          "There is no personal data sale and no ad SDK in the app.",
        ],
      },
      {
        title: "3. Backup, restore and user control",
        items: [
          "Users can export local JSON backups containing library data.",
          "Users can import backups to restore app state.",
          "Users can delete all application data in settings.",
        ],
      },
    ],
    termsSection: "Terms of Use",
    termsBlocks: [
      {
        title: "1. Software purpose",
        items: [
          "Critix Vault is designed to organize a user's own local video collection.",
          "The app does not provide, host, or distribute copyrighted audiovisual content.",
        ],
      },
      {
        title: "2. User responsibility",
        items: [
          "Users are responsible for the legality of local content managed in the app.",
          "Users are responsible for backup handling and exported data storage.",
          "Third-party API usage is subject to each provider's terms and policies.",
        ],
      },
      {
        title: "3. Availability and changes",
        items: [
          "Features may change according to product technical evolution.",
          "External integrations may be unavailable due to factors outside app control.",
          "This page may be updated to reflect new features and legal requirements.",
        ],
      },
    ],
    transparencySection: "Technical Transparency (How the app works)",
    transparencyCards: [
      {
        title: "Local layer",
        body: "Local SQLite database with Prisma for library, episodes, history and preferences persistence.",
      },
      {
        title: "External integration",
        body: "Queries media metadata from external APIs to enrich the local catalog.",
      },
      {
        title: "Governance",
        body: "Users keep full data control through backup, restore and full local data cleanup.",
      },
    ],
    metadataSources: "Critix API and TMDB",
  },
};

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-sm md:p-8">
      <header className="mb-5 flex items-center gap-3">
        <span className="rounded-xl border border-primary-crx/40 bg-primary-crx/15 p-2 text-primary-crx">
          {icon}
        </span>
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      </header>
      <div className="space-y-4 text-text-secondary">{children}</div>
    </section>
  );
}

export function PoliciesTermsContent({
  msStoreUrl,
  repoUrl,
  lastUpdated,
}: PoliciesTermsContentProps) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") {
        setLanguage(saved);
        return;
      }

      const browserLanguage = navigator.language.toLowerCase().startsWith("pt")
        ? "pt"
        : "en";
      setLanguage(browserLanguage);
    } catch {
      setLanguage("pt");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors
    }
  }, [language]);

  const copy = useMemo(() => copyByLanguage[language], [language]);

  return (
    <main className="min-h-screen bg-linear-to-b from-bg-body via-bg-surface to-bg-body text-text-primary">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/critix-vault"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm text-text-secondary transition-all hover:border-primary-crx/60 hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>

          <div className="inline-flex rounded-full border border-white/15 bg-black/25 p-1">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={`rounded-full px-3 py-1 text-sm transition-all ${
                language === "pt"
                  ? "bg-primary-crx text-on-primary-crx"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-3 py-1 text-sm transition-all ${
                language === "en"
                  ? "bg-primary-crx text-on-primary-crx"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-primary-crx/30 bg-primary-crx/10 p-6 md:p-8">
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-crx">
            <BadgeCheck className="h-4 w-4" />
            {copy.badge}
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-text-secondary">
            {copy.description}
          </p>
          <p className="mt-3 text-sm text-text-muted">
            {copy.updated}: {lastUpdated}
          </p>
        </div>

        <div className="space-y-6">
          <SectionCard
            title={copy.microsoftSection}
            icon={<FileText className="h-5 w-5" />}
          >
            <p>{copy.overview}</p>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  {copy.cards.appName}
                </p>
                <p className="mt-1 font-semibold text-text-primary">
                  {APP_INFO.name}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  {copy.cards.identifier}
                </p>
                <p className="mt-1 font-semibold text-text-primary">
                  {APP_INFO.identifier}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  {copy.cards.platform}
                </p>
                <p className="mt-1 font-semibold text-text-primary">
                  {APP_INFO.platform}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  {copy.cards.packageType}
                </p>
                <p className="mt-1 font-semibold text-text-primary">
                  {APP_INFO.bundleTarget}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="mb-2 text-sm font-semibold text-text-primary">
                {copy.capabilitiesTitle}
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {copy.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p>
              {copy.officialLinks}{" "}
              <a
                href={msStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-crx hover:underline"
              >
                {copy.storeText}
              </a>{" "}
              {copy.andConnector}{" "}
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-crx hover:underline"
              >
                {copy.repoText}
              </a>
              .
            </p>
          </SectionCard>

          <SectionCard
            title={copy.privacySection}
            icon={<ShieldCheck className="h-5 w-5" />}
          >
            {copy.privacyBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="mb-2 font-semibold text-text-primary">
                  {block.title}
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </SectionCard>

          <SectionCard
            title={copy.termsSection}
            icon={<Lock className="h-5 w-5" />}
          >
            {copy.termsBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="mb-2 font-semibold text-text-primary">
                  {block.title}
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </SectionCard>

          <SectionCard
            title={copy.transparencySection}
            icon={<Server className="h-5 w-5" />}
          >
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="mb-2 flex items-center gap-2 font-semibold text-text-primary">
                  <Database className="h-4 w-4 text-primary-crx" />
                  {copy.transparencyCards[0].title}
                </p>
                <p>{copy.transparencyCards[0].body}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="mb-2 flex items-center gap-2 font-semibold text-text-primary">
                  <Server className="h-4 w-4 text-primary-crx" />
                  {copy.transparencyCards[1].title}
                </p>
                <p>{copy.transparencyCards[1].body}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="mb-2 flex items-center gap-2 font-semibold text-text-primary">
                  <ShieldCheck className="h-4 w-4 text-primary-crx" />
                  {copy.transparencyCards[2].title}
                </p>
                <p>{copy.transparencyCards[2].body}</p>
              </div>
            </div>

            <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
              Metadata sources:{" "}
              <span className="font-semibold text-text-primary">
                {copy.metadataSources}
              </span>
            </p>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
