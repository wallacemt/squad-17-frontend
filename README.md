# Critix - Frontend

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange) &nbsp;
![Cargo version](https://img.shields.io/static/v1?label=cargo&message=v0.1.0&color=yellow) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=green)

## Indices

- [`Sobre o Projeto`](#sobre-o-projeto)
- [`Tecnologias Utilizadas`](#tecnologias-utilizadas)
- [`Estrutura do Projeto`](#estrutura-projeto)
- [`Configuração é Execução`](#configuracao-execucao)
- [`Principais Funcionalidades`](#principais-func)
- [`Capturas de Tela`](#screenshots)
- [`Contribuições`](#contribuicoes)
- [`Licença`](#license)

<span id="sobre-o-projeto"></span>

## 📌 Sobre o Projeto

O **Critix** é uma plataforma de avaliação de filmes e séries. O frontend foi desenvolvido com **React** e consome a API do backend para fornecer uma experiência dinâmica e interativa aos usuários.

## 🚀 Tecnologias Utilizadas

<div align='center' id="tecnologias-utilizadas">
    <img align='center' height='49' width='49' title='React' alt='React' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Tailwind' alt='Tailwind' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Axios' alt='Axios' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain-wordmark.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='StoryBook' alt='StoryBook' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' style="filter: invert(1);"  title='FrameMotion' alt='FrameMotion' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original-wordmark.svg'/> &nbsp;
    <img align='center' height='49' width='49' style="filter: invert(1);"  title='Swiper' alt='Swiper' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swiper/swiper-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Vite' alt='Vite' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg'/> &nbsp;
     <img align='center' height='49' width='49' title='JS' alt='JS' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'/> &nbsp;
     <img align='center' height='49' width='49' title='json' alt='json' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg'/> &nbsp;

</div>

<span id="estrutura-projeto"></span>

## 📂 Estrutura do Projeto

```
critix-frontend/
│-- public
│-- src/
│   ├── components/
│   ├── screens/
│   ├── api/
│   ├── stories/
│   ├── contexts/
│   ├── hooks/
│-- .env
│-- docker-compose.yml
│-- Dockerfile
│-- package.json
│-- tailwind.config.js
│-- README.md
```

<span id="configuracao-execucao"></span>

## 🛠️ Configuração e Execução

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/wallacemt/squad-17-frontend
cd squad-17-frontend
```

### 2️⃣ Instalar Dependências

```bash
npm install
```
### 3️⃣ Rodar a Aplicação com Docker

```bash
docker-compose up --build -d
```
`A aplicação estará disponível em` **http://localhost:3000**

### 4️⃣ 4️⃣ Rodar a Aplicação Manualmente (Sem Docker)

```bash
npm run dev
```

<span id="principais-func"></span>`

# 📌 Principais Funcionalidades

- `Autenticação JWT`
- `Feed dinâmico de avaliações`
- `Watchlist personalizada`
- `Interação via curtidas, comentários e compartilhamentos`
- `Animações fluidas e transições elegantes`
- `Responsividade e acessibilidade`

<span id="screenshots"></span>

# 🖼️ Screenshots

- ### Aréa de Login
<div align='center'>
    <img style="border-radius:1.5rem"  title='login' alt='login' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222384/Captura_de_tela_2025-03-05_212941_jkdl14.png' /> &nbsp;
</div>

- ### Feed
<div align='center'>
    <img style="border-radius:1.5rem"  title='feed' alt='feed' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222401/Captura_de_tela_2025-03-05_213059_t1tqvb.png' /> &nbsp;
</div>

- ### Recomendation Card
<div align='center'>
    <img style="border-radius:1.5rem"  title='Recomendation' alt='Recomendation' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222363/Captura_de_tela_2025-03-05_213130_ueosc9.png' /> &nbsp;
</div>

- ### Review Card
<div align='center'>
    <img style="border-radius:1.5rem"  title='Review' alt='Review' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222364/Captura_de_tela_2025-03-05_213217_hopb3c.png' /> &nbsp;
</div>

- ### WatchList
<div align='center'>
    <img style="border-radius:1.5rem"  title='WatchList' alt='WatchList' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222374/Captura_de_tela_2025-03-05_213234_p8vc1c.png' /> &nbsp;
</div>

- ### User Page
<div align='center'>
    <img style="border-radius:1.5rem"  title='User' alt='User' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222370/Captura_de_tela_2025-03-05_213308_q5flyu.png' /> &nbsp;
</div>

- ### Outhers Users Page
<div align='center'>
    <img style="border-radius:1.5rem"  title='Outhers' alt='Outhers' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222375/Captura_de_tela_2025-03-05_213333_wdhdgr.png' /> &nbsp;
</div>

- ### User Tier Rank
<div align='center'>
    <img style="border-radius:1.5rem"  title='Rank' alt='Rank' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222379/Captura_de_tela_2025-03-05_213413_fmylh8.png' /> &nbsp;
</div>

- ### Media Page
<div align='center'>
    <img style="border-radius:1.5rem"  title='Media' alt='Media' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222397/Captura_de_tela_2025-03-05_213616_ox4wta.png' /> &nbsp;
    <img style="border-radius:1.5rem"  title='Media' alt='Media' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222505/Captura_de_tela_2025-03-05_215450_nx5sw5.png' /> &nbsp;
</div>

- ### Search Page
<div align='center'>
    <img style="border-radius:1.5rem"  title='Search' alt='Search' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222400/Captura_de_tela_2025-03-05_213649_rb31kb.png' /> &nbsp;
</div>

- ### FAQ Page
<div align='center'>
    <img style="border-radius:1.5rem"  title='FAQ' alt='FAQ' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222375/Captura_de_tela_2025-03-05_213424_eckptn.png' /> &nbsp;
</div>

- ### Notification Page
<div align='center'>
    <img style="border-radius:1.5rem"  title='Notification' alt='Notification' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1741222376/Captura_de_tela_2025-03-05_213533_ywd50v.png' /> &nbsp;
</div>

<span id="contribuicoes"></span>

## 🛠 Contribuição

Ficou interessado em contribuir? Faça um **fork** do repositório, crie uma **branch**, implemente a melhoria e envie um **pull request**. Toda ajuda é bem-vinda!

1. **Fork the repository.**
2. **Clone your forked repository to your local machine.**
3. **Create a branch for your feature or fix:**

   ```bash
   git checkout -b my-new-feature
   ```

4. **Commit your changes:**

   ```bash
   git commit -m 'Add new feature'
   ```

5. **Push your changes to your fork:**

   ```bash
   git push origin my-new-feature
   ```

6. **Create a Pull Request.**

<span id="license"></span>

# 📜 Licença

`Este projeto está sob a licença MIT.`
