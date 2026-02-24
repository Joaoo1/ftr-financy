import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
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
import { Label } from "../components/label";
import { useAuth } from "../hooks/context/useAuth";
import { loginSchema, type LoginInput } from "../schemas/login";

export function Login() {
  const { isLoggingIn, login, loginError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const handleSubmit = (data: LoginInput) => {
    login({ email: data.email, password: data.password });
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
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
                        placeholder="email@exemplo.com"
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

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="remember" className="cursor-pointer">
                      Lembrar-me
                    </Label>
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    className="text-brand-base"
                  >
                    Recuperar senha
                  </Button>
                </div>
              )}
            />
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
      </Form>
    </>
  );
}
