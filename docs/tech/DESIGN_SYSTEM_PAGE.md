# Critix Design System Page

## Objetivo

Criar uma pagina unica para demonstrar como o sistema visual do Critix funciona na pratica, reutilizando classes, componentes e interacoes que ja existem no produto.

## Rota

- URL: /design-system
- Arquivo: src/app/(home)/design-system/page.tsx

## Estrutura da pagina

A pagina foi organizada com navegacao superior por ancora e as seguintes secoes:

1. Hero

- Clone estrutural do hero da landing (mesma logica visual de fundo, cards flutuantes, tipografia e CTAs)
- Conteudo textual adaptado para contexto de Design System

2. Typography

- Lista espec de estilos em formato vertical
- Ordem apresentada:
  - Heading 1
  - Heading 2
  - Heading 3
  - Heading 4
  - Bold L / Bold M / Bold S
  - Paragraph
  - Regular L / Regular M / Regular S
- Cada linha mostra: nome, preview real e label de size/line-height

3. Colors & Surfaces

- Fundos principais (body/surface/surface-light)
- Superficie com blur (glass)
- Gradientes de marca e de CTA usados na landing

4. UI Components

- Buttons: default, outline, ghost, destructive, disabled e estilos custom da landing
- Inputs: default, preview de focus e estado invalido
- Cards: padrao e destaque
- Badges: variantes principais e exemplo custom

5. Layout & Spacing

- Pattern Hero Split
- Pattern Feature Grid
- Pattern Content Split

6. Motion & Interaction

- Entrance animation
- Hover/tap em botoes
- Lift em cards
- Motion gallery com classes utilitarias e loop framer-motion

7. Icons

- Sistema de icones com Lucide
- Variantes de tamanho e heranca de cor por tokens

## Reuso de base existente

A pagina foi montada com o design language ja presente no projeto:

- Tokens e classes de cor/superficie vindas de src/app/globals.css
- Componentes UI existentes:
  - Button
  - Input
  - Card
  - Badge
  - Label
- Elementos visuais da landing:
  - GradientBlinds
  - cards flutuantes
  - classes de gradiente e glow

## Como evoluir

- Acrescentar exemplos de componentes novos sempre que entrarem na aplicacao
- Manter os previews usando classes reais (evitar estilos paralelos)
- Atualizar labels de tipografia caso o scale mude
- Adicionar um link para /design-system no fluxo de navegacao principal, se desejado
