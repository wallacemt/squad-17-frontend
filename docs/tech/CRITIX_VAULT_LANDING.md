# Critix Vault Landing

## Objetivo

Criar uma landing page dedicada ao app desktop Critix Vault, com identidade visual unica, reaproveitando tokens e componentes do projeto frontend atual.

## Rota

- URL: /critix-vault
- Arquivo: src/app/(home)/critix-vault/page.tsx

## Estrutura e responsabilidades

1. Rota server

- Faz orquestracao de dados com ISR
- Busca dados de download no service GitHub
- Injeta fallback resiliente em caso de erro

2. Service layer

- Arquivo: src/services/githubVaultService.ts
- Responsavel por integrar com GitHub API
- Normaliza releases, tags e assets
- Detecta assets instalaveis por plataforma

3. UI da landing

- Arquivo: src/components/vault-landing/CritixVaultLandingPage.tsx
- Pagina orquestradora com secoes desacopladas
- Componentes por secao em src/components/vault-landing/\_components
  - vault-navbar.tsx
  - vault-hero-section.tsx
  - vault-features-section.tsx
  - vault-screenshots-section.tsx
  - vault-download-section.tsx
  - vault-faq-section.tsx
  - vault-page-background.tsx

4. Conteudo estatico

- Arquivo: src/components/vault-landing/content.ts
- Centraliza copy e listas para facilitar manutencao

## Integracao de download

- A landing consulta releases e tags do repositorio:
  - https://github.com/wallacemt/critix-vault-desktop
- Estado atual esperado:
  - Sem releases com instalador
  - Download principal via MS Store
  - Versoes listadas via API para transparencia
- Quando houver assets instalaveis em release, botoes de download direto serao habilitados automaticamente.

### Toggle mock dev-only

- A secao de download possui toggle de mock de instaladores apenas em ambiente de desenvolvimento.
- Objetivo: permitir preview dos cards de instalacao antes de releases reais existirem no repositorio.
- Em producao, o toggle nao e exibido.

## Uso de React Bits

Componentes selecionados do catalogo @react-bits para a landing:

- Background: Gradient Blinds (hero)
- Element: Spotlight Card (cards com foco de luz por ponteiro)

Arquivos utilizados:

- src/components/ui/blocks/background/GradientBlinds/GradientBlinds.tsx
- src/components/ui/blocks/elements/SpotlightCard/SpotlightCard.tsx

## Configuracao opcional

Variavel para link da MS Store:

- NEXT_PUBLIC_CRITIX_VAULT_MS_STORE_URL

Fallback atual quando ausente:

- https://apps.microsoft.com/

## Assets

Capturas do desktop copiadas para:

- public/images/vault

## Validacao recomendada

1. npm run lint
2. npm run build
3. npm run dev
4. Validar desktop e mobile em /critix-vault
5. Validar bloco de download em:
   - sem releases
   - com releases simuladas
