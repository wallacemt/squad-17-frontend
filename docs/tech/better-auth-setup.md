# 🔐 Guia de Configuração Better Auth

## 📦 Instalação

```bash
bun add better-auth
```

## 🔧 Configuração do Backend

### 1. Variáveis de Ambiente (.env)

```env
# Better Auth
BETTER_AUTH_URL=http://localhost:3001
BETTER_AUTH_SECRET=your-secret-key-here-minimum-32-chars

# Database
DATABASE_URL=your-database-url

# OAuth Providers
# Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Discord
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret

# Figma
FIGMA_CLIENT_ID=your-figma-client-id
FIGMA_CLIENT_SECRET=your-figma-client-secret

# Reddit
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-client-secret

# Apple
APPLE_CLIENT_ID=your-apple-client-id
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id
APPLE_PRIVATE_KEY=your-apple-private-key
```

### 2. Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_URL=http://localhost:3000
```

## 📝 Configuração Better Auth no Backend

Crie um arquivo `auth.ts` no backend:

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // ou seu provider
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
    // Adicione outros providers conforme necessário
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
```

## 🗄️ Schema do Prisma

Adicione os schemas necessários no seu `schema.prisma`:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  password      String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  profile       UserProfile?
  sessions      Session[]
  accounts      Account[]
}

model UserProfile {
  id         String   @id @default(cuid())
  userId     String   @unique
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  nickname   String   @unique
  birthDate  String
  gender     String
  followed   Int      @default(0)
  following  Int      @default(0)
  country    String
  avatarUrl  String?
  bio        String?

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt    DateTime
  token        String   @unique
  ipAddress    String?
  userAgent    String?

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  @@unique([provider, providerAccountId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## 🌐 Configuração de OAuth Providers

### Google

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em "APIs & Services" > "Credentials"
4. Crie "OAuth 2.0 Client ID"
5. Configure redirect URI: `http://localhost:3001/api/auth/callback/google`

### GitHub

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Crie um "New OAuth App"
3. Configure:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3001/api/auth/callback/github`

### Discord

1. Acesse [Discord Developer Portal](https://discord.com/developers/applications)
2. Crie "New Application"
3. Vá em "OAuth2" e adicione redirect: `http://localhost:3001/api/auth/callback/discord`

### Figma

1. Acesse [Figma Developers](https://www.figma.com/developers)
2. Crie um novo app
3. Configure redirect URI: `http://localhost:3001/api/auth/callback/figma`

### Reddit

1. Acesse [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Crie "web app"
3. Configure redirect URI: `http://localhost:3001/api/auth/callback/reddit`

### Apple

1. Acesse [Apple Developer](https://developer.apple.com/)
2. Configure Sign in with Apple
3. Siga a documentação específica da Apple

## 🔄 Fluxos de Autenticação

### Login com Email/Username

```typescript
POST /api/auth/login
{
  "emailOrUsername": "user@example.com",
  "password": "password123"
}
```

### Registro

```typescript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "nickname": "johndoe",
  "birthDate": "1990-01-01",
  "gender": "male",
  "country": "Brazil"
}
```

### Verificação de Email (OTP)

```typescript
POST /api/auth/verify-otp
{
  "email": "user@example.com",
  "code": "123456",
  "type": "email-verification"
}
```

### Verificar Nickname

```typescript
GET /api/auth/check-nickname?nickname=johndoe
```

### OAuth

```typescript
GET / api / auth / oauth / { provider };
// Redireciona para provider
// Callback: /api/auth/callback/{provider}
```

## ✅ Checklist de Implementação

- [ ] Instalar better-auth no backend
- [ ] Configurar variáveis de ambiente
- [ ] Criar schemas do Prisma
- [ ] Implementar rotas de autenticação
- [ ] Configurar OAuth providers (Google, GitHub mínimo)
- [ ] Implementar verificação de email (OTP)
- [ ] Implementar verificação de nickname
- [ ] Testar fluxos de autenticação
- [ ] Implementar refresh token
- [ ] Configurar CORS adequadamente

## 🔒 Segurança

- Use HTTPS em produção
- Configure CORS adequadamente
- Use httpOnly cookies para tokens sensíveis
- Implemente rate limiting
- Valide todos os inputs
- Use bcrypt ou argon2 para senhas
- Implemente 2FA (opcional)

## 📚 Recursos Adicionais

- [Better Auth Docs](https://better-auth.com)
- [Prisma Docs](https://prisma.io)
- [OAuth 2.0 Guide](https://oauth.net/2/)
