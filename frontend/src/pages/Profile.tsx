import { toast } from "sonner";
import { UserRound, Mail, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../hooks/context/useAuth";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { getInitials } from "../utils/string";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";
import { useUpdateUser } from "../hooks/api/useUpdateUser";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "../schemas/updateProfile";

export default function Profile() {
  const { user, logout: authLogout, updateUserName } = useAuth();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name || "" },
  });

  const { mutate: updateUser, isPending: isLoading } = useUpdateUser({
    onSuccess: (updatedUser) => {
      updateUserName(updatedUser.name);
      form.reset({ name: updatedUser.name });
      toast.success("Perfil atualizado com sucesso");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao atualizar perfil");
    },
  });

  const handleSubmit = (data: UpdateProfileInput) => {
    updateUser({ name: data.name.trim() });
  };

  const nameValue = form.watch("name");
  const isDirty = nameValue !== user?.name;

  return (
    <main className="flex-1 p-12 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl border border-gray-200 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-brand-base rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-white text-2xl font-medium font-['Inter']">
              {user?.name ? getInitials(user.name) : "??"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 w-full">
            <h1 className="text-center text-gray-900 text-xl font-semibold font-['Inter']">
              {user?.name || "Usuário"}
            </h1>
            <p className="text-center text-gray-500 text-base font-normal font-['Inter']">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
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
                        disabled={isLoading}
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-sm font-medium">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="pl-10 opacity-50 cursor-not-allowed"
                />
              </div>
              <p className="text-gray-500 text-xs font-normal font-['Inter']">
                O e-mail não pode ser alterado
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !isDirty}
                className="bg-brand-base hover:bg-brand-dark text-white font-medium font-['Inter'] rounded-lg"
              >
                {isLoading ? "Salvando..." : "Salvar alterações"}
              </Button>
              <Button
                type="button"
                onClick={authLogout}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="bg-white border border-gray-300 text-gray-700 font-medium font-['Inter'] rounded-lg hover:bg-gray-50"
              >
                <LogOut className="w-4.5 h-4.5 mr-2 text-red-base" />
                Sair da conta
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
