# Sistema de Cache com localStorage

## Visão Geral

O sistema de cache do Critix utiliza `localStorage` para persistir o estado dos formulários de autenticação, permitindo que os usuários retomem de onde pararam mesmo após fechar o navegador ou recarregar a página.

## Arquitetura

### 1. Hook Genérico: `useFormCache`

**Localização**: `src/hooks/useFormCache.ts`

Hook reutilizável que gerencia o cache de qualquer tipo de formulário.

**Características**:

- 🔄 **Sincronização automática** com localStorage
- ⏰ **TTL (Time To Live)** configurável
- 🔒 **Type-safe** com TypeScript generics
- ♻️ **Expiração automática** de dados antigos
- 🛡️ **Error handling** integrado

**Exemplo de uso**:

```typescript
const cache = useFormCache<MyFormData>({
  key: "my_form_cache",
  initialData: {
    name: "",
    email: "",
  },
  ttl: 24 * 60 * 60 * 1000, // 24 horas
});

// Atualizar um campo
cache.updateField("name", "João");

// Atualizar múltiplos campos
cache.updateFields({
  name: "João",
  email: "joao@example.com",
});

// Verificar se há dados em cache
if (cache.hasCachedData()) {
  console.log("Dados restaurados:", cache.data);
}

// Limpar cache
cache.clearCache();
```

### 2. Hooks Especializados: `useAuthCache`

**Localização**: `src/hooks/useAuthCache.ts`

Três hooks especializados para diferentes contextos de autenticação:

#### `useRegisterFormCache`

Cache para o formulário de registro (2 passos).

**TTL**: 24 horas

**Dados**:

```typescript
{
  currentStep: 1 | 2,
  step1: RegisterStep1Data,
  step2: RegisterStep2Data
}
```

**Uso no componente**:

```typescript
const formCache = useRegisterFormCache();

// Carregar dados ao montar
const [currentStep, setCurrentStep] = useState(formCache.data.currentStep);
const [step1Data, setStep1Data] = useState(formCache.data.step1);
const [step2Data, setStep2Data] = useState(formCache.data.step2);

// Sincronizar com cache
useEffect(() => {
  if (formCache.isLoaded) {
    formCache.saveToCache({
      currentStep,
      step1: step1Data,
      step2: step2Data,
    });
  }
}, [currentStep, step1Data, step2Data, formCache.isLoaded]);

// Limpar após sucesso
formCache.clearCache();
```

#### `useLoginFormCache`

Cache para o formulário de login.

**TTL**: 7 dias (para conveniência do usuário)

**Dados**:

```typescript
{
  email: string,
  password: string,
  rememberMe: boolean
}
```

#### `useAuthModeCache`

Cache para rastrear o último modo de autenticação visitado.

**TTL**: 30 minutos

**Dados**:

```typescript
{
  mode: string,
  lastVisited: string (ISO timestamp)
}
```

## Integração nos Componentes

### RegisterForm

**Arquivo**: `src/components/auth/_components/register-form.tsx`

**Recursos**:

- ✅ Carrega dados automaticamente ao montar
- ✅ Salva alterações em tempo real
- ✅ Botão "Limpar" para resetar cache
- ✅ Limpa cache após registro bem-sucedido

**Fluxo**:

1. Usuário preenche o Passo 1
2. Dados são salvos automaticamente no localStorage
3. Usuário fecha a aba acidentalmente
4. Ao retornar, dados são restaurados
5. Usuário continua do Passo 1 (ou avança para Passo 2)
6. Após registro bem-sucedido, cache é limpo

### LoginForm

**Arquivo**: `src/components/auth/_components/login-form.tsx`

**Recursos**:

- ✅ Restaura email/senha de tentativas anteriores
- ✅ TTL de 7 dias (mais longo para conveniência)
- ✅ Indicador de dados salvos
- ✅ Opção de limpar cache manualmente
- ✅ Limpa cache após login bem-sucedido

### ModeManager

**Arquivo**: `src/components/auth/_components/mode-manager.tsx`

**Recursos**:

- ✅ Rastreia último modo visitado (login, register, otp, etc.)
- ✅ TTL de 30 minutos
- ✅ Permite retornar ao último ponto de navegação

## Chaves de Cache

Todas as chaves são prefixadas com `critix_` para evitar conflitos:

```typescript
const CACHE_KEYS = {
  REGISTER: "critix_register_form",
  LOGIN: "critix_login_form",
  AUTH_MODE: "critix_auth_mode",
} as const;
```

## TTL (Time To Live)

Cada cache tem um tempo de expiração apropriado:

| Cache     | TTL        | Motivo                                                            |
| --------- | ---------- | ----------------------------------------------------------------- |
| Register  | 24 horas   | Registro pode levar tempo, mas não deve persistir indefinidamente |
| Login     | 7 dias     | Conveniência para logins frequentes                               |
| Auth Mode | 30 minutos | Navegação dentro da sessão                                        |

## Estrutura de Dados em Cache

```typescript
interface CachedData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}
```

Exemplo no localStorage:

```json
{
  "critix_register_form": {
    "data": {
      "currentStep": 1,
      "step1": {
        "name": "João Silva",
        "email": "joao@example.com",
        "password": "******",
        "confirmPassword": "******"
      },
      "step2": {
        "nickname": "",
        "birthDate": "2000-01-01",
        "gender": "prefer-not-to-say",
        "country": "BR"
      }
    },
    "timestamp": 1704067200000,
    "expiresAt": 1704153600000
  }
}
```



### Console Logs

Para desenvolvimento, mensagens são logadas quando dados são restaurados:

```typescript
useEffect(() => {
  if (formCache.isLoaded && formCache.hasCachedData()) {
    console.log("Dados do formulário restaurados");
  }
}, [formCache.isLoaded, formCache.hasCachedData]);
```

**Nota**: Em produção, você pode substituir por notificações toast.

## Limpeza de Cache

### Automática

- ✅ Após registro bem-sucedido
- ✅ Após login bem-sucedido
- ✅ Quando TTL expira

### Manual

- ✅ Botão "Limpar" no footer
- ✅ `formCache.clearCache()` via código

## Considerações de Segurança

✅ **IMPLEMENTADO**: Sistema de criptografia client-side para senhas!

### Criptografia de Senhas

O sistema agora usa **Web Crypto API** para criptografar senhas antes de armazená-las no localStorage:

#### Algoritmos Utilizados:

- **PBKDF2**: Key derivation com 100.000 iterações
- **AES-GCM**: Encriptação simétrica de 256 bits
- **Salt aleatório**: Gerado por sessão e armazenado em sessionStorage
- **IV aleatório**: Initialization Vector único para cada encriptação

#### Fluxo de Segurança:

```typescript
// 1. Ao salvar senha no cache
const encrypted = await encryptPassword("minhaSenha123");
// Resultado: "base64_encoded_iv+encrypted_data"
localStorage.setItem(
  "critix_login_form",
  JSON.stringify({
    email: "user@example.com",
    password: encrypted, // Senha criptografada
    rememberMe: true,
  })
);

// 2. Ao carregar senha do cache
const cached = JSON.parse(localStorage.getItem("critix_login_form"));
const decrypted = await decryptPassword(cached.password);
// Resultado: "minhaSenha123"
```

#### Arquivo: `src/utils/clientHash.ts`

```typescript
// Funções disponíveis:
encryptPassword(password: string): Promise<string>
decryptPassword(encryptedPassword: string): Promise<string>
clearEncryptionSalt(): void // Chamado no logout
```

#### Proteções Implementadas:

✅ **Salt por sessão**: Salt único é gerado ao iniciar navegador e descartado ao fechar  
✅ **IV único**: Cada senha tem seu próprio Initialization Vector  
✅ **Limpeza no logout**: Salt é removido ao fazer logout, invalidando cache antigo  
✅ **100k iterações PBKDF2**: Proteção contra brute force  
✅ **AES-GCM 256-bit**: Criptografia de nível militar

#### Limitações de Segurança:

⚠️ **Ainda é localStorage**: Apesar da criptografia, é client-side storage  
⚠️ **Chave fixa**: Usa passphrase fixa "critix_cache_encryption_key_v1"  
⚠️ **XSS vulnerability**: Se houver XSS, código malicioso pode acessar memória  
⚠️ **Não é end-to-end**: Senha é descriptografada na memória do navegador

### Recomendações para Produção:

1. ✅ **Já implementado**: Criptografia AES-GCM + PBKDF2
2. ✅ **Já implementado**: Limpeza de salt no logout
3. 🔒 **Considere**: Não cachear senhas, apenas email/username
4. 🔒 **Considere**: Session Storage em vez de localStorage (limpa ao fechar aba)
5. 🔒 **Considere**: Expiração mais curta para senhas (ex: 1 hora)
6. 🔒 **Implemente**: Content Security Policy (CSP) para prevenir XSS
7. 🔒 **Implemente**: Rate limiting no backend

### Alternativa Ainda Mais Segura (Opcional):

```typescript
// Não cachear senha, apenas lembrar email
const formCache = useLoginFormCache();

useEffect(() => {
  if (formCache.isLoaded) {
    formCache.saveToCache({
      email: formData.emailOrUsername,
      password: "", // NÃO cacheia senha
      rememberMe: formData.rememberMe,
    });
  }
}, [formData.emailOrUsername, formData.rememberMe]);
```

## Manutenção

### Adicionar Novo Cache

1. Defina a interface de dados
2. Adicione a chave em `CACHE_KEYS`
3. Crie um novo hook especializado:

```typescript
export function useMyFormCache() {
  return useFormCache<MyFormData>({
    key: CACHE_KEYS.MY_FORM,
    initialData: {
      // seus dados iniciais
    },
    ttl: 60 * 60 * 1000, // 1 hora
  });
}
```

4. Integre no componente

### Debug

Para inspecionar o cache manualmente:

```javascript
// No console do navegador
localStorage.getItem("critix_register_form");
localStorage.getItem("critix_login_form");
localStorage.getItem("critix_auth_mode");

// Limpar todo o cache do Critix
Object.keys(localStorage)
  .filter((key) => key.startsWith("critix_"))
  .forEach((key) => localStorage.removeItem(key));
```

## Testes

### Testar Persistência

1. Preencha o formulário de registro até o meio
2. Feche a aba
3. Reabra a página de autenticação
4. Verifique se os dados foram restaurados

### Testar Expiração

1. Crie um cache com TTL curto (ex: 5 segundos)
2. Aguarde o TTL expirar
3. Recarregue a página
4. Verifique que os dados não foram restaurados

### Testar Limpeza

1. Preencha o formulário
2. Clique no botão "Limpar"
3. Verifique que a página foi recarregada e dados resetados

## Migração Futura

Para migrar de localStorage para outra solução (IndexedDB, API, etc.):

1. Mantenha a interface do `useFormCache`
2. Modifique apenas a implementação interna
3. Os componentes não precisam ser alterados

Exemplo com API:

```typescript
// Substituir localStorage por fetch
const saveToServer = async (key: string, data: T) => {
  await fetch("/api/cache", {
    method: "POST",
    body: JSON.stringify({ key, data }),
  });
};
```

## Conclusão

O sistema de cache proporciona uma excelente experiência do usuário, reduzindo a frustração de perder dados ao navegar acidentalmente. Com **criptografia AES-GCM**, **TTL configurável** e **limpeza automática**, é uma solução robusta e **segura** para persistência client-side.

### ✅ Implementado:

- ✅ Cache com TTL por tipo de formulário
- ✅ Criptografia de senhas (PBKDF2 + AES-GCM)
- ✅ Sincronização automática com localStorage
- ✅ Limpeza de salt no logout
- ✅ Indicadores visuais de dados salvos
- ✅ Type-safety completo com TypeScript

### 🚀 Próximos Passos:

- [ ] Implementar notificações toast em vez de console.log
- [ ] Adicionar analytics para rastrear uso do cache
- [ ] Implementar versioning para migrações de schema
- [ ] Considerar Session Storage para senhas (limpeza ao fechar aba)
- [ ] Implementar CSP (Content Security Policy) para prevenir XSS
