import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";

import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { ErrorCard } from "../components/error-card";
import { useAuth } from "../hooks/context/useAuth";

export function Login() {
  const { isLoggingIn, login, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-gray-800 text-lg sm:text-xl font-bold font-['Inter']">
          Fazer login
        </h1>
        <p className="text-gray-600 text-sm sm:text-base font-normal font-['Inter'] text-center">
          Entre na sua conta para continuar
        </p>
      </div>

      {loginError && <ErrorCard message={loginError} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                className="pl-10"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                className="pl-10"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-700"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeClosed className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="cursor-pointer">
                Lembrar-me
              </Label>
            </div>
            <Button variant="ghost" className="text-brand-base">
              Recuperar senha
            </Button>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={isLoggingIn}>
          {isLoggingIn ? "Entrando..." : "Entrar"}
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-xs sm:text-sm font-normal font-['Inter']">
            ou
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-center text-gray-600 text-xs sm:text-sm font-normal font-['Inter']">
            Ainda não tem uma conta?
          </p>
          <Link to="/cadastro">
            <Button variant="outline" size="lg" className="w-full">
              <UserRoundPlus className="w-4.5 h-4.5" />
              Criar conta
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
