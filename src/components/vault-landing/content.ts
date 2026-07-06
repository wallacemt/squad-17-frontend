import type {
  VaultGithubRelease,
  VaultInstallableAsset,
} from "@/types/vault-downloads";

export const vaultSectionLinks = [
  { id: "visao", label: "Visao" },
  { id: "recursos", label: "Recursos" },
  { id: "capturas", label: "Capturas" },
  { id: "download", label: "Download" },
  { id: "faq", label: "FAQ" },
];

export const vaultHighlights = [
  {
    title: "Biblioteca visual",
    description:
      "Transforme suas pastas locais em uma experiencia estilo streaming sem reorganizar tudo manualmente.",
  },
  {
    title: "Escaneamento inteligente",
    description:
      "Detecta filmes, series, temporadas e episodios automaticamente para reduzir trabalho manual.",
  },
  {
    title: "Controle total",
    description:
      "Corrija metadados, caminhos e episodios com edicao individual ou em lote quando necessario.",
  },
  {
    title: "Historico assistido",
    description:
      "Acompanhe episodios e temporadas ja vistos para manter seu progresso organizado.",
  },
  {
    title: "Backup e restauracao",
    description:
      "Proteja sua biblioteca com backup local e restaure em poucos cliques.",
  },
  {
    title: "Modo demonstracao",
    description:
      "Explore a interface e fluxos do app antes de configurar sua biblioteca real.",
  },
];

export const vaultFeatureBullets = [
  "Adicionar pastas da colecao com poucos cliques",
  "Montar biblioteca automaticamente",
  "Visualizar filmes e series em layout moderno",
  "Abrir detalhes completos de cada midia",
  "Marcar episodios e temporadas como assistidos",
  "Editar episodios por temporada ou em lote",
];

export const vaultSteps = [
  "Abra o app Critix Vault no desktop",
  "Clique em Adicionar Pasta",
  "Aguarde o escaneamento inicial",
  "Comece a navegar e assistir com a biblioteca pronta",
];

export const vaultFaq = [
  {
    question: "O Critix Vault altera minhas pastas originais?",
    answer:
      "Nao. O app organiza a visualizacao e metadados sem exigir renomeacao manual da sua estrutura original.",
  },
  {
    question: "Preciso estar online para usar?",
    answer:
      "A biblioteca local funciona com foco offline. Integracoes externas sao usadas para enriquecer dados quando disponiveis.",
  },
  {
    question: "Quando o download direto no site fica disponivel?",
    answer:
      "Assim que releases com instaladores forem publicadas no GitHub, a landing libera automaticamente os botoes de download direto.",
  },
];

export const vaultScreenshots = [
  {
    src: "/images/vault/home.png",
    alt: "Tela inicial do Critix Vault",
    title: "Home com destaque para biblioteca",
    caption:
      "Entrada principal com atalho para exploracao e ultimo conteudo visto.",
  },
  {
    src: "/images/vault/library-movies.png",
    alt: "Biblioteca de filmes no Critix Vault",
    title: "Biblioteca de filmes",
    caption: "Visualizacao de catalogo com foco em descoberta rapida.",
  },
  {
    src: "/images/vault/library-series.png",
    alt: "Biblioteca de series no Critix Vault",
    title: "Biblioteca de series",
    caption:
      "Colecoes por serie com navegacao pronta para temporadas e episodios.",
  },
  {
    src: "/images/vault/movie-screen.png",
    alt: "Detalhes de filme no Critix Vault",
    title: "Detalhes completos de filme",
    caption: "Sinopse, metadados e acoes em uma unica tela.",
  },
  {
    src: "/images/vault/serie-screen.png",
    alt: "Detalhes de serie no Critix Vault",
    title: "Gestao de serie e episodios",
    caption: "Fluxo de temporadas com controle de progresso por episodio.",
  },
  {
    src: "/images/vault/config.png",
    alt: "Configuracoes do Critix Vault",
    title: "Configuracoes e ajustes",
    caption: "Ajustes de comportamento, dados e experiencia de uso.",
  },
  {
    src: "/images/vault/help.png",
    alt: "Tela de ajuda do Critix Vault",
    title: "Ajuda integrada",
    caption: "Suporte contextual para acelerar onboarding e manutencao.",
  },
  {
    src: "/images/vault/library-movie-2.png",
    alt: "Variacao da biblioteca de filmes",
    title: "Visual alternativo de catalogo",
    caption:
      "Outra leitura do acervo para reforcar dinamica visual da interface.",
  },
];

export const vaultMockInstallableAssets: VaultInstallableAsset[] = [
  {
    releaseTag: "v1.0.0-mock",
    releaseName: "Critix Vault Mock Release",
    platform: "windows",
    name: "CritixVault_1.0.0_x64-setup.exe",
    downloadUrl: "https://github.com/wallacemt/critix-vault-desktop/releases",
    sizeLabel: "87.2 MB",
  },
  {
    releaseTag: "v1.0.0-mock",
    releaseName: "Critix Vault Mock Release",
    platform: "windows",
    name: "CritixVault_1.0.0_x64_en-US.msi",
    downloadUrl: "https://github.com/wallacemt/critix-vault-desktop/releases",
    sizeLabel: "82.5 MB",
  },
  {
    releaseTag: "v1.0.0-mock",
    releaseName: "Critix Vault Mock Release",
    platform: "linux",
    name: "CritixVault_1.0.0_amd64.AppImage",
    downloadUrl: "https://github.com/wallacemt/critix-vault-desktop/releases",
    sizeLabel: "90.1 MB",
  },
  {
    releaseTag: "v1.0.0-mock",
    releaseName: "Critix Vault Mock Release",
    platform: "linux",
    name: "critix-vault_1.0.0_amd64.deb",
    downloadUrl: "https://github.com/wallacemt/critix-vault-desktop/releases",
    sizeLabel: "88.3 MB",
  },
  {
    releaseTag: "v1.0.0-mock",
    releaseName: "Critix Vault Mock Release",
    platform: "macos",
    name: "CritixVault_1.0.0_x64.dmg",
    downloadUrl: "https://github.com/wallacemt/critix-vault-desktop/releases",
    sizeLabel: "93.4 MB",
  },
];

export const vaultMockReleases: VaultGithubRelease[] = [
  {
    id: -1,
    name: "Critix Vault Mock Release",
    tagName: "v1.0.0-mock",
    prerelease: false,
    draft: false,
    htmlUrl: "https://github.com/wallacemt/critix-vault-desktop/releases",
    publishedAt: new Date().toISOString(),
    changelog:
      "### Novidades\n- Suporte a temas customizados\n- Melhoria de performance no scanner de biblioteca\n\n### Correcoes\n- Corrige travamento ao importar colecoes grandes",
    assets: [],
  },
];
