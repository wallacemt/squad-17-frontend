"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Calendar,
  UserCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Shuffle,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, PasswordInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { PasswordStrengthBar } from "@/components/ui/password-strength-bar";
import { StepIndicator } from "@/components/ui/step-indicator";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries, genderOptions, generateNickname, nicknameTips } from "@/utils/countries";
import type { RegisterStep1Data, RegisterStep2Data } from "@/types/auth";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  onSubmit: (data: RegisterStep1Data & RegisterStep2Data) => Promise<void>;
  onLogin: () => void;
  onCheckNickname: (nickname: string) => Promise<boolean>;
  isLoading?: boolean;
}
const validadeStep1Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validadeStep2Regex = /^[a-zA-Z0-9_]+$/;
const handleSubmitRegex = /^[a-zA-Z0-9_]+$/;
export function RegisterForm({ onSubmit, onLogin, onCheckNickname, isLoading = false }: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(2);
  const [step1Data, setStep1Data] = useState<RegisterStep1Data>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step2Data, setStep2Data] = useState<RegisterStep2Data>({
    nickname: "",
    birthDate: "",
    gender: "prefer-not-to-say",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<RegisterStep1Data & RegisterStep2Data>>({});
  const [nicknameChecking, setNicknameChecking] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const [showNicknameTips, setShowNicknameTips] = useState(false);

  const validateStep1 = (): boolean => {
    const newErrors: Partial<RegisterStep1Data> = {};

    if (!step1Data.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!step1Data.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validadeStep1Regex.test(step1Data.email)) {
      newErrors.email = "Email inválido";
    }

    if (!step1Data.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (step1Data.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";
    }

    if (step1Data.password !== step1Data.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<RegisterStep2Data> = {};

    if (!step2Data.nickname.trim()) {
      newErrors.nickname = "Nome de usuário é obrigatório";
    } else if (step2Data.nickname.length < 3) {
      newErrors.nickname = "Nome de usuário deve ter no mínimo 3 caracteres";
    } else if (!validadeStep2Regex.test(step2Data.nickname)) {
      newErrors.nickname = "Nome de usuário deve conter apenas letras, números e _";
    } else if (nicknameAvailable === false) {
      newErrors.nickname = "Nome de usuário já está em uso";
    }

    if (!step2Data.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
    }

    if (!step2Data.country.trim()) {
      newErrors.country = "País é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      return;
    }

    try {
      await onSubmit({ ...step1Data, ...step2Data });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const checkNickname = useCallback(
    async (nickname: string) => {
      if (nickname.length < 3 || !handleSubmitRegex.test(nickname)) {
        setNicknameAvailable(null);
        return;
      }

      setNicknameChecking(true);
      try {
        const available = await onCheckNickname(nickname);
        setNicknameAvailable(available);
      } catch (error) {
        console.error("Nickname check error:", error);
      } finally {
        setNicknameChecking(false);
      }
    },
    [onCheckNickname]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (step2Data.nickname) {
        checkNickname(step2Data.nickname);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [step2Data.nickname, checkNickname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-border-color bg-bg-surface-light/50 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <CardTitle className="font-bold font-display text-3xl text-text-primary">Criar conta</CardTitle>
            <CardDescription className="text-text-secondary">
              Junte-se à comunidade de críticos de cinema
            </CardDescription>
          </div>

          {/* Progress Steps */}
          <StepIndicator
            steps={[
              {
                id: 1,
                title: "Credenciais",
                description: "Informações de acesso",
                icon: <Lock className="h-4 w-4" />,
              },
              {
                id: 2,
                title: "Perfil",
                description: "Dados pessoais",
                icon: <UserCircle className="h-4 w-4" />,
              },
            ]}
            currentStep={currentStep}
          />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Forms */}
          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={step1Data.name}
                  onChange={(e) => setStep1Data({ ...step1Data, name: e.target.value })}
                  error={errors.name}
                  icon={<User className="h-5 w-5" />}
                  disabled={isLoading}
                />

                <Input
                  type="email"
                  placeholder="Email"
                  value={step1Data.email}
                  onChange={(e) => setStep1Data({ ...step1Data, email: e.target.value })}
                  error={errors.email}
                  icon={<Mail className="h-5 w-5" />}
                  disabled={isLoading}
                />

                <div className="space-y-2">
                  <PasswordInput
                    placeholder="Senha"
                    value={step1Data.password}
                    onChange={(e) => setStep1Data({ ...step1Data, password: e.target.value })}
                    error={errors.password}
                    icon={<Lock className="h-5 w-5" />}
                    disabled={isLoading}
                  />
                  <PasswordStrengthBar password={step1Data.password} />
                </div>

                <PasswordInput
                  placeholder="Confirmar senha"
                  value={step1Data.confirmPassword}
                  onChange={(e) => setStep1Data({ ...step1Data, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                  icon={<Lock className="h-5 w-5" />}
                  disabled={isLoading}
                />

                <AuthButton
                  type="button"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleNextStep}
                  icon={<ArrowRight className="h-5 w-5" />}
                >
                  Continuar
                </AuthButton>
              </motion.div>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-text-secondary" htmlFor="userName">
                      Nome de usuário
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowNicknameTips(!showNicknameTips)}
                      id="userName"
                      className="text-text-muted hover:text-text-secondary transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </div>

                  {!!showNicknameTips && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-lg bg-bg-surface p-3 space-y-1"
                    >
                      {nicknameTips.map((tip, _idx) => (
                        <p key={tip} className="text-xs text-text-muted flex items-start gap-2">
                          <span className="text-color-primary">•</span>
                          <span>{tip}</span>
                        </p>
                      ))}
                    </motion.div>
                  )}

                  <div className="relative flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="exemplo_usuario123"
                        value={step2Data.nickname}
                        onChange={(e) => setStep2Data({ ...step2Data, nickname: e.target.value })}
                        error={errors.nickname}
                        icon={<UserCircle className="h-5 w-5" />}
                        disabled={isLoading}
                      />
                      {!!nicknameChecking && (
                        <div className="absolute right-3 top-3">
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-color-primary border-t-transparent" />
                        </div>
                      )}
                      {nicknameAvailable === true && !nicknameChecking && (
                        <div className="absolute right-3 top-3">
                          <Check className="h-5 w-5 text-color-success" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newNickname = generateNickname(step1Data.name);
                        setStep2Data({ ...step2Data, nickname: newNickname });
                      }}
                      disabled={!step1Data.name || isLoading}
                      className="flex h-12 items-center gap-2 rounded-xl border border-border-color bg-bg-surface px-4 text-sm font-medium text-text-secondary transition-all hover:border-color-primary hover:text-color-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Gerar nickname aleatório"
                    >
                      <Shuffle className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <Input
                  type="date"
                  placeholder="Data de nascimento"
                  value={step2Data.birthDate}
                  onChange={(e) => setStep2Data({ ...step2Data, birthDate: e.target.value })}
                  error={errors.birthDate}
                  icon={<Calendar className="h-5 w-5" />}
                  disabled={isLoading}
                  max={new Date().toISOString().split("T")[0]}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary" htmlFor="gender">
                    Gênero
                  </label>
                  <Select
                    value={step2Data.gender}
                    onValueChange={(value) => setStep2Data({ ...step2Data, gender: value as typeof step2Data.gender })}
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className="h-12 w-full rounded-xl border-border-color bg-bg-surface-light text-text-primary focus:border-color-primary focus:ring-2 focus:ring-color-primary/20"
                      id="gender"
                    >
                      <SelectValue placeholder="Selecione seu gênero" />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-surface-light border-border-color">
                      {genderOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-text-primary hover:bg-bg-surface focus:bg-bg-surface cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary" htmlFor="country">
                    País
                  </label>
                  <Select
                    value={step2Data.country}
                    onValueChange={(value) => setStep2Data({ ...step2Data, country: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className="h-12 w-full rounded-xl border-border-color bg-bg-surface-light text-text-primary focus:border-color-primary focus:ring-2 focus:ring-color-primary/20"
                      id="country"
                    >
                      <SelectValue placeholder="Selecione seu país">
                        {!!step2Data.country && (
                          <span className="flex items-center gap-2">
                            <span>{countries.find((c) => c.code === step2Data.country)?.flag}</span>
                            <span>{countries.find((c) => c.code === step2Data.country)?.name}</span>
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-bg-surface-light border-border-color max-h-60">
                      {countries.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.code}
                          className="text-text-primary hover:bg-bg-surface focus:bg-bg-surface cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!!errors.country && <p className="text-xs text-color-danger">{errors.country}</p>}
                </div>

                <div className="flex gap-3">
                  <AuthButton
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    icon={<ArrowLeft className="h-5 w-5" />}
                    className="flex-1"
                  >
                    Voltar
                  </AuthButton>
                  <AuthButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    icon={<Check className="h-5 w-5" />}
                    className="flex-1"
                  >
                    Criar conta
                  </AuthButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex-col space-y-4 pt-6">
          <Separator />
          <div className="text-center text-sm text-text-secondary">
            Já tem uma conta?{" "}
            <Button
              onClick={onLogin}
              variant={"ghost"}
              className="font-semibold text-color-primary hover:text-color-primary-hover transition-colors"
            >
              Entrar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
