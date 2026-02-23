import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { Mail, UserRound, Lock, Eye, EyeClosed, LogIn } from "lucide-react";

import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { ErrorCard } from "../components/error-card";
import { useRegister } from "../hooks/api/useRegister";

export function Signup() {
  const navigate = useNavigate();

  const { mutate: register, isPending: isRegistering } = useRegister({
    onMutate: () => {
      setFormError("");
    },
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    },
    onError: (err) => {
      const message = err.message || "Erro ao realizar o cadastro";
      setFormError(message);
    },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name,
      email,
      password,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-gray-800 text-xl font-bold font-['Inter']">
          Criar conta
        </h1>
        <p className="text-gray-600 text-base font-normal font-['Inter']">
          Comece a controlar suas finanças ainda hoje
        </p>
      </div>

      {formError && <ErrorCard message={formError} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="mail@exemplo.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
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
                required
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
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
            <p className="text-gray-500 text-xs font-normal">
              A senha deve ter no mínimo 8 caracteres
            </p>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={isRegistering}>
          {isRegistering ? "Cadastrando..." : "Cadastrar"}
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm font-normal font-['Inter']">
            ou
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-center text-gray-600 text-sm font-normal font-['Inter']">
            Já tem uma conta?
          </p>
          <Link to="/">
            <Button variant="outline" size="lg" className="w-full">
              <LogIn className="w-4.5 h-4.5 mr-2" />
              Fazer login
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
