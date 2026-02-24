import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { Mail, UserRound, Lock, Eye, EyeClosed, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/button";
import { ErrorCard } from "../components/error-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";
import { Input } from "../components/input";
import { useRegister } from "../hooks/api/useRegister";
import { registerSchema, type RegisterInput } from "../schemas/register";

export function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const { mutate: register, isPending: isRegistering } = useRegister({
    onMutate: () => setFormError(""),
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    },
    onError: (err) => {
      setFormError(err.message || "Erro ao realizar o cadastro");
    },
  });

  const handleSubmit = (data: RegisterInput) => {
    register(data);
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Seu nome completo"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="mail@exemplo.com"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        className="pl-10"
                        {...field}
                      />
                      <Button
                        type="button"
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      </Form>
    </>
  );
}
