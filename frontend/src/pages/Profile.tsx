import { useState } from "react";
import { toast } from "sonner";
import { UserRound, Mail, LogOut, Loader2 } from "lucide-react";

import { useAuth } from "../hooks/context/useAuth";
import { Button } from "../components/button";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useUpdateUser } from "../hooks/api/useUpdateUser";

export default function Profile() {
  const { user, logout: authLogout, updateUserName } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const isLoading = false;

  const { mutateAsync: updateUser } = useUpdateUser({
    onSuccess: (updatedUser) => {
      updateUserName(updatedUser.name);
      toast.success("Perfil atualizado com sucesso");
    },
  });

  const handleSave = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nome não pode estar vazio");
      return;
    }

    updateUser({ name: name.trim() });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="flex-1 p-12 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl border border-gray-200 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-[#1e6e42] rounded-full flex items-center justify-center overflow-hidden">
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

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              className="text-gray-700 text-sm font-medium font-['Inter']"
            >
              Nome completo
            </Label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="pl-10 py-3.5 bg-white rounded-lg border border-gray-300 text-base font-['Inter']"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-gray-700 text-sm font-medium font-['Inter']"
            >
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="pl-10 py-3.5 bg-white rounded-lg border border-gray-300 text-base font-['Inter'] opacity-50 cursor-not-allowed"
              />
            </div>
            <p className="text-gray-500 text-xs font-normal font-['Inter']">
              O e-mail não pode ser alterado
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button
              type="submit"
              disabled={isLoading || !name.trim() || name === user?.name}
              className="h-12 bg-[#1e6e42] hover:bg-[#165a35] text-white text-base font-medium font-['Inter'] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar alterações"
              )}
            </Button>
            <Button
              onClick={authLogout}
              disabled={isLoading}
              variant="outline"
              className="h-12 bg-white border border-gray-300 text-gray-700 text-base font-medium font-['Inter'] rounded-lg hover:bg-gray-50"
            >
              <LogOut className="w-4.5 h-4.5 mr-2 text-red-base" />
              Sair da conta
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
