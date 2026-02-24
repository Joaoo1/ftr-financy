import { useState } from "react";
import { Plus, Tag, ArrowUpDown, SquarePen, Trash } from "lucide-react";

import { useCategoryModal } from "../../hooks/useCategoryModal";
import { useDeleteCategory } from "../../hooks/api/useDeleteCategory";
import { useCreateCategory } from "../../hooks/api/useCreateCategory";
import { useUpdateCategory } from "../../hooks/api/useUpdateCategory";
import { Button } from "../../components/button";
import { useCategories } from "../../hooks/api/useCategories";
import { CategoryIcon } from "../../components/category-icon";
import { lightenColor } from "../../utils/colors";
import type { CreateCategoryInput } from "../../schemas/createCategory";
import { CategoryModal } from "./components/CategoryModal";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { toast } from "sonner";

export default function Categories() {
  const modal = useCategoryModal();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: categories, isLoading, refetch } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory({
    onSuccess: () => {
      setDeleteId(null);
      refetch();
      toast.success("Categoria deletada com sucesso!");
    },
    onError: (err) => {
      const message = err.message || "Erro ao deletar categoria";
      toast.error(message);
    },
  });
  const { mutate: createCategory } = useCreateCategory({
    onSuccess: (data) => {
      modal.closeModal();
      refetch();
      toast.success(`Categoria ${data.title} criada com sucesso!`);
    },
    onError: (err) => {
      const message = err.message || "Erro ao criar categoria";
      toast.error(message);
    },
  });
  const { mutate: updateCategory } = useUpdateCategory({
    onSuccess: (data) => {
      modal.closeModal();
      refetch();
      toast.success(`Categoria ${data.title} atualizada com sucesso!`);
    },
    onError: (err) => {
      const message = err.message || "Erro ao atualizar categoria";
      toast.error(message);
    },
  });

  const handleDeleteCategory = () => {
    if (deleteId) deleteCategory(deleteId);
  };

  const handleSubmitModal = (data: CreateCategoryInput) => {
    if (modal.mode === "create") {
      createCategory(data);
    } else {
      updateCategory({ id: modal.category!.id, ...data });
    }
  };

  const totalCategories = categories?.total ?? 0;
  const totalTransactions =
    categories?.items.reduce(
      (sum, cat) => sum + (cat.transactionsCount ?? 0),
      0,
    ) ?? 0;
  const mostUsedCategory = categories?.items.reduce((mostUsed, cat) => {
    if ((cat.transactionsCount ?? 0) > (mostUsed.transactionsCount ?? 0)) {
      return cat;
    }
    return mostUsed;
  }, categories?.items[0]);

  return (
    <main className="flex-1 p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-gray-900 text-2xl font-bold font-['Inter']">
              Categorias
            </h1>
            <p className="text-gray-600 text-sm sm:text-base font-normal font-['Inter']">
              Organize suas transações por categorias
            </p>
          </div>
          <Button
            onClick={() => modal.openCreateModal()}
            className="h-9 px-3 py-2 bg-[#1e6e42] hover:bg-[#165a35] text-white text-sm font-medium font-['Inter'] rounded-lg w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 flex items-start gap-4">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-gray-900 text-xl sm:text-2xl lg:text-[28px] font-bold font-['Inter']">
                {totalCategories}
              </p>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                total de categorias
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 flex items-start gap-4">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <ArrowUpDown className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-gray-900 text-xl sm:text-2xl lg:text-[28px] font-bold font-['Inter']">
                {totalTransactions}
              </p>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                total de transações
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 flex items-start gap-4">
            <CategoryIcon
              size="lg"
              hasBackground={false}
              iconName={mostUsedCategory?.icon ?? "Tag"}
              color={mostUsedCategory?.color ?? "#64748B"}
            />

            <div className="flex-1 flex flex-col gap-2">
              <p className="text-gray-900 text-xl sm:text-2xl lg:text-[28px] font-bold font-['Inter'] truncate">
                {mostUsedCategory?.title ?? "Nenhuma categoria"}
              </p>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                categoria mais utilizada
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-8 text-gray-600">
            Carregando categorias...
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories?.items.map((category) => {
            const lightenedColor = lightenColor(category.color, 0.9);

            return (
              <div
                key={category.id}
                className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 flex flex-col hover:shadow-lg transition-all h-full"
              >
                <div className="flex justify-between items-start">
                  <CategoryIcon
                    iconName={category.icon}
                    color={category.color}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setDeleteId(category.id)}
                      className="w-9 h-9 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center hover:bg-red-50 hover:border-red-100 transition-all"
                      title="Excluir"
                    >
                      <Trash className="w-4 h-4 text-danger" />
                    </Button>
                    <Button
                      onClick={() => modal.openEditModal(category as any)}
                      className="w-9 h-9 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-200 transition-all"
                      title="Editar"
                    >
                      <SquarePen className="w-4 h-4 text-[#1E293B]" />
                    </Button>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-1 flex-1">
                  <h3 className="text-[#1E293B] text-[18px] font-bold leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-[#64748B] text-sm font-normal line-clamp-2">
                    {category.description || "Nenhuma descrição informada"}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div
                    className={`px-4 py-1.5 rounded-full`}
                    style={{ backgroundColor: lightenedColor }}
                  >
                    <p
                      className="text-xs font-bold"
                      style={{ color: category.color }}
                    >
                      {category.title}
                    </p>
                  </div>
                  <span className="text-[#64748B] text-sm font-medium">
                    {category.transactionsCount || 0} itens
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryModal
        open={modal.isOpen}
        onOpenChange={modal.closeModal}
        onSubmit={handleSubmitModal}
        title={modal.mode === "create" ? "Nova Categoria" : "Editar Categoria"}
        defaultValues={modal.getDefaultValues()}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDeleteCategory}
        title="Excluir categoria"
        description={`Tem certeza que deseja excluir "${categories?.items.find((c) => c.id === deleteId)?.title}"? Esta ação não pode ser desfeita.`}
      />
    </main>
  );
}
