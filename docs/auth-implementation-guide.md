# 🎬 Sistema de Autenticação Critix

Sistema completo de autenticação implementado com design cinematográfico e integração Better Auth.

## ✨ Recursos Implementados

### 🎨 Design

- ✅ Fontes personalizadas (Moonjelly display + Poppins)
- ✅ Interface dividida (carrossel + formulários)
- ✅ Animações suaves com Framer Motion
- ✅ Design responsivo e acessível
- ✅ Tema dark cinematográfico

### 🔐 Funcionalidades de Autenticação

#### 1. Login (`/auth?mode=login`)

- Email ou username
- Senha com toggle de visibilidade
- Lembrar-me
- Links para registro e recuperação de senha
- Login social (Google, GitHub, Discord, Figma, Reddit, Apple)

#### 2. Registro (`/auth?mode=register`)

- **Step 1**: Nome, email, senha, confirmar senha
- **Step 2**: Nickname (validação em tempo real), data de nascimento, gênero, país
- Barra de força da senha
- Verificação de nickname único
- Auto-login após verificação de email

#### 3. Verificação OTP (`/auth?mode=otp`)

- Input de 6 dígitos com auto-focus
- Suporte a paste
- Timer de reenvio (60s)
- Usado para: verificação de email e reset de senha

#### 4. Login Social

- Configuração pré-pronta para 6 provedores
- Botões estilizados por provedor
- Fluxo OAuth completo

### 🛠️ Componentes Criados

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx          # Formulário de login
│   │   ├── RegisterForm.tsx       # Formulário de registro (2 steps)
│   │   └── OTPForm.tsx            # Verificação de código OTP
│   └── ui/
│       ├── auth-input.tsx         # Input personalizado + PasswordInput
│       ├── auth-button.tsx        # Botão com loading e variantes
│       ├── auth-carousel.tsx      # Carrossel de imagens
│       ├── social-login-buttons.tsx  # Botões de login social
│       └── password-strength-bar.tsx # Barra de força da senha
├── hooks/
│   ├── useAuth.tsx               # Gerenciamento de sessão
│   └── useApi.ts                 # HTTP client com refresh automático
├── types/
│   └── auth.ts                   # Tipos TypeScript
└── middleware.ts                 # Proteção de rotas
```

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
# Se ainda não instalou
bun add framer-motion lucide-react
```

### 2. Configurar Variáveis de Ambiente

Crie `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_URL=http://localhost:3000
```

### 3. Navegação entre Modos

```typescript
// Login
<Link href="/auth?mode=login">Entrar</Link>

// Registro
<Link href="/auth?mode=register">Criar conta</Link>

// OTP (geralmente chamado automaticamente)
router.push('/auth?mode=otp')

// Login Social
// Configurado automaticamente nos botões
```

### 4. Usar Hooks

```typescript
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";

export function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  const api = useApi();

  const fetchData = async () => {
    // Automaticamente adiciona token e faz refresh se necessário
    const data = await api.get("/api/protected-route");
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bem-vindo, {user?.name}</p>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <Link href="/auth?mode=login">Entrar</Link>
      )}
    </div>
  );
}
```

## 🔧 Configuração Backend

Siga o guia em `docs/better-auth-setup.md` para:

1. Configurar Better Auth no backend
2. Criar schemas do Prisma
3. Configurar OAuth providers
4. Implementar rotas de API

### Rotas Esperadas pelo Frontend

```typescript
POST /auth/login              # Login com email/username
POST /auth/register           # Criar nova conta
POST /auth/verify-otp         # Verificar código OTP
POST /auth/resend-otp         # Reenviar código
GET  /auth/check-nickname     # Verificar se nickname está disponível
POST /auth/refresh            # Refresh access token
GET  /auth/oauth/{provider}   # Iniciar OAuth flow
```

## 🎨 Personalização

### Cores

Edite `src/app/globals.css`:

```css
:root {
  --color-primary: #ffc107; /* Dourado principal */
  --color-primary-hover: #ffd54f; /* Dourado hover */
  --bg-body: #121212; /* Fundo escuro */
  /* ... mais cores */
}
```

### Fontes

As fontes já estão configuradas:

- `font-display` → Moonjelly (títulos)
- `font-sans` → Poppins (corpo de texto)

Use nas classes:

```tsx
<h1 className="font-display text-4xl">Título</h1>
<p className="font-sans text-base">Texto</p>
```

### Imagens do Carrossel

Edite em `src/app/auth/page.tsx`:

```typescript
const carouselImages = [
  {
    src: "/path/to/image.jpg",
    alt: "Descrição",
    title: "Título",
    subtitle: "Subtítulo",
  },
  // ... mais imagens
];
```

## 🔒 Segurança

### Proteção de Rotas

O middleware já protege automaticamente:

```typescript
// Rotas protegidas (requer auth)
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

// Rotas de auth (redireciona se já autenticado)
const authRoutes = ["/auth"];
```

### Token Management

- Access token armazenado em memória (context)
- Refresh automático antes de expirar
- Logout automático em erro 401
- HTTPS obrigatório em produção

## 📝 Próximos Passos

1. **Backend**:

   - [ ] Implementar rotas de autenticação
   - [ ] Configurar Better Auth
   - [ ] Configurar OAuth providers
   - [ ] Implementar envio de email (OTP)

2. **Frontend**:

   - [ ] Adicionar modo "forgot-password"
   - [ ] Adicionar modo "reset-password"
   - [ ] Implementar 2FA (opcional)
   - [ ] Adicionar testes E2E
   - [ ] Adicionar analytics de conversão

3. **UX**:
   - [ ] Adicionar toast notifications (Sonner)
   - [ ] Melhorar feedback de erros
   - [ ] Adicionar skeleton loaders
   - [ ] Implementar dark/light mode toggle

## 🐛 Troubleshooting

### Erro: "useAuth must be used within an AuthProvider"

**Solução**: Certifique-se que o AuthProvider está no layout raiz.

### Sessão não persiste após refresh

**Solução**: Verifique se localStorage está habilitado e se o domínio está correto.

### OAuth não funciona

**Solução**:

1. Verifique variáveis de ambiente
2. Confirme redirect URIs nos providers
3. Verifique CORS no backend

### Fontes não carregam

**Solução**: Certifique-se que os arquivos `.otf` estão em `src/app/assets/fonts/`

## 📚 Referências

- [Better Auth Docs](https://better-auth.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)
- [Next.js Auth](https://nextjs.org/docs/authentication)

## 🤝 Contribuindo

Este projeto segue as melhores práticas de:

- TypeScript strict mode
- Component composition
- Hooks personalizados
- Error boundaries
- Acessibilidade (WCAG 2.1)
