/** biome-ignore-all lint/performance/useTopLevelRegex: abreviation regex */
export const countries = [
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "ES", name: "Espanha", flag: "🇪🇸" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "FR", name: "França", flag: "🇫🇷" },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
  { code: "DE", name: "Alemanha", flag: "🇩🇪" },
  { code: "IT", name: "Itália", flag: "🇮🇹" },
  { code: "CA", name: "Canadá", flag: "🇨🇦" },
  { code: "JP", name: "Japão", flag: "🇯🇵" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "KR", name: "Coreia do Sul", flag: "🇰🇷" },
  { code: "AU", name: "Austrália", flag: "🇦🇺" },
  { code: "IN", name: "Índia", flag: "🇮🇳" },
  { code: "RU", name: "Rússia", flag: "🇷🇺" },
  { code: "ZA", name: "África do Sul", flag: "🇿🇦" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CO", name: "Colômbia", flag: "🇨🇴" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "UY", name: "Uruguai", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "PY", name: "Paraguai", flag: "🇵🇾" },
  { code: "BO", name: "Bolívia", flag: "🇧🇴" },
  { code: "EC", name: "Equador", flag: "🇪🇨" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "PA", name: "Panamá", flag: "🇵🇦" },
  { code: "NL", name: "Holanda", flag: "🇳🇱" },
  { code: "BE", name: "Bélgica", flag: "🇧🇪" },
  { code: "CH", name: "Suíça", flag: "🇨🇭" },
  { code: "SE", name: "Suécia", flag: "🇸🇪" },
  { code: "NO", name: "Noruega", flag: "🇳🇴" },
  { code: "DK", name: "Dinamarca", flag: "🇩🇰" },
  { code: "FI", name: "Finlândia", flag: "🇫🇮" },
  { code: "PL", name: "Polônia", flag: "🇵🇱" },
  { code: "TR", name: "Turquia", flag: "🇹🇷" },
  { code: "SA", name: "Arábia Saudita", flag: "🇸🇦" },
  { code: "AE", name: "Emirados Árabes", flag: "🇦🇪" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "EG", name: "Egito", flag: "🇪🇬" },
  { code: "NG", name: "Nigéria", flag: "🇳🇬" },
  { code: "KE", name: "Quênia", flag: "🇰🇪" },
  { code: "TH", name: "Tailândia", flag: "🇹🇭" },
  { code: "VN", name: "Vietnã", flag: "🇻🇳" },
  { code: "ID", name: "Indonésia", flag: "🇮🇩" },
  { code: "MY", name: "Malásia", flag: "🇲🇾" },
  { code: "SG", name: "Singapura", flag: "🇸🇬" },
  { code: "PH", name: "Filipinas", flag: "🇵🇭" },
  { code: "NZ", name: "Nova Zelândia", flag: "🇳🇿" },
];

export const genderOptions = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Feminino" },
  { value: "non-binary", label: "Não-binário" },
  { value: "other", label: "Outro" },
  { value: "prefer-not-to-say", label: "Prefiro não dizer" },
];

/**
 * Gera um nickname aleatório baseado no nome do usuário
 */
export function generateNickname(fullName: string): string {
  if (!fullName.trim()) {
    return "";
  }

  // Remove espaços extras e divide o nome
  const names = fullName.trim().split(/\s+/);
  const firstName = names[0].toLowerCase();

  // Diferentes estratégias de geração
  const strategies = [
    // Estratégia 1: primeiro nome + números aleatórios
    () => `${firstName}${Math.floor(Math.random() * 9999)}`,

    // Estratégia 2: primeiro nome + últimas letras do sobrenome + números
    () => {
      if (names.length > 1) {
        const lastName = names.at(-1)?.toLowerCase();
        return `${firstName}${lastName?.slice(-3)}${Math.floor(Math.random() * 999)}`;
      }
      return `${firstName}${Math.floor(Math.random() * 9999)}`;
    },

    // Estratégia 3: iniciais + números
    () => {
      const initials = names
        .map((n) => n[0])
        .join("")
        .toLowerCase();
      return `${initials}${Math.floor(Math.random() * 9999)}`;
    },

    // Estratégia 4: primeiro nome com caracteres especiais
    () => {
      const suffixes = ["_", ".", "-"];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      return `${firstName}${suffix}${Math.floor(Math.random() * 999)}`;
    },

    // Estratégia 5: primeiro nome + adjetivo cool
    () => {
      const adjectives = [
        "pro",
        "master",
        "elite",
        "king",
        "ace",
        "legend",
        "star",
        "vip",
      ];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      return `${firstName}${adj}${Math.floor(Math.random() * 99)}`;
    },
  ];

  // Escolhe uma estratégia aleatória
  const strategy = strategies[Math.floor(Math.random() * strategies.length)];
  return strategy();
}

/**
 * Valida se o nickname está no formato correto
 */
export function validateNickname(nickname: string): boolean {
  // Apenas letras, números e underscore, 3-20 caracteres
  return /^[a-zA-Z0-9_]{3,20}$/.test(nickname);
}

/**
 * Dicas de nickname para o usuário
 */
export const nicknameTips = [
  "Use apenas letras, números e underscore (_)",
  "Entre 3 e 20 caracteres",
  "Seu nickname será único e público",
  "Escolha algo que represente você",
];
