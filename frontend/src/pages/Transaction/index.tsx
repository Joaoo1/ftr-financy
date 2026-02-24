import { useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  CircleArrowUp,
  CircleArrowDown,
  ChevronLeft,
  ChevronRight,
  Trash,
  SquarePen,
} from "lucide-react";

import { Filters } from "./components/Filters";
import { formatCurrency } from "../../utils/currency";
import { getDefaultPeriod } from "../../utils/date";
import { useTransactionModal } from "../../hooks/useTransactionModal";
import { Button } from "../../components/button";
import type { Transaction, TransactionType } from "../../types";
import { CategoryIcon } from "../../components/category-icon";
import { lightenColor } from "../../utils/colors";
import { TransactionModal } from "./components/TransactionModal";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { useCategories } from "../../hooks/api/useCategories";
import { useCreateTransaction } from "../../hooks/api/useCreateTransaction";
import { useDeleteTransaction } from "../../hooks/api/useDeleteTransaction";
import { useUpdateTransaction } from "../../hooks/api/useUpdateTransaction";
import type { CreateTransactionInput } from "../../schemas/createTransaction";
import { useTransactions } from "../../hooks/api/useTransactions";

export default function Transactions() {
  const modal = useTransactionModal();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    search: "",
    period: getDefaultPeriod(),
  });

  const [periodMonth, periodYear] = filters.period.split("-").map(Number);

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useTransactions({
    page,
    limit: perPage,
    filter: {
      categoryId: filters.category !== "all" ? filters.category : undefined,
      type:
        filters.type !== "all" ? (filters.type as TransactionType) : undefined,
      description: filters.search || undefined,
      month: periodMonth,
      year: periodYear,
    },
  });

  const { data: categories } = useCategories();

  const { mutate: deleteTransaction } = useDeleteTransaction({
    onSuccess: () => {
      setDeleteId(null);
      refetch();
      toast.success("Transação deletada com sucesso!");
    },
    onError: (err) => {
      const message = err.message || "Erro ao deletar transação";
      toast.error(message);
    },
  });
  const { mutate: createTransaction } = useCreateTransaction({
    onSuccess: (data) => {
      modal.closeModal();
      refetch();
      toast.success(`Transação ${data.description} criada com sucesso!`);
    },
    onError: (err) => {
      const message = err.message || "Erro ao criar transação";
      toast.error(message);
    },
  });
  const { mutate: updateTransaction } = useUpdateTransaction({
    onSuccess: (data) => {
      modal.closeModal();
      refetch();
      toast.success(`Transação ${data.description} atualizada com sucesso!`);
    },
    onError: (err) => {
      const message = err.message || "Erro ao atualizar transação";
      toast.error(message);
    },
  });

  const handleDeleteTransaction = () => {
    if (deleteId) deleteTransaction(deleteId);
  };

  const handleSubmitModal = (data: CreateTransactionInput) => {
    if (modal.mode === "create") {
      createTransaction(data);
    } else {
      updateTransaction({ id: modal.transaction!.id, ...data });
    }
  };

  const totalCount = transactions?.total || 0;
  const totalPages = Math.ceil(totalCount / perPage);
  const from = totalCount === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, totalCount);

  return (
    <main className="flex-1 p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-gray-900 text-[28px] font-bold">Transações</h1>
            <p className="text-gray-600 text-base font-normal">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <Button
            onClick={() => modal.openCreateModal()}
            className="h-10 px-4 bg-brand-base hover:bg-brand-dark text-white text-sm font-semibold rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova transação
          </Button>
        </div>

        <Filters
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
          categories={categories?.items ?? []}
        />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4 text-left font-bold">Descrição</th>
                  <th className="w-32 px-4 py-4 text-center font-bold">Data</th>
                  <th className="w-40 px-4 py-4 text-center font-bold">
                    Transação
                  </th>
                  <th className="w-32 px-4 py-4 text-center font-bold">Tipo</th>
                  <th className="w-32 px-4 py-4 text-right font-bold">Valor</th>
                  <th className="w-28 px-6 py-4 text-right font-bold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="h-40">
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-base" />
                      </div>
                    </td>
                  </tr>
                ) : transactions && transactions.items.length > 0 ? (
                  transactions.items.map((transaction: Transaction) => {
                    const lightenedColor = lightenColor(
                      transaction.category.color,
                      0.8,
                    );

                    return (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <CategoryIcon
                              iconName={transaction.category.icon}
                              color={transaction.category.color}
                            />
                            <span className="text-gray-900 font-semibold text-sm">
                              {transaction.description}
                            </span>
                          </div>
                        </td>

                        <td className="w-32 px-4 py-4 text-center text-gray-500 text-sm">
                          {new Date(transaction.date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </td>

                        <td className="w-40 px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <p
                              className="px-3 py-1 rounded-full text-xs font-semibold"
                              style={{
                                backgroundColor: lightenedColor,
                                color: transaction.category.color,
                              }}
                            >
                              {transaction.category.title}
                            </p>
                          </div>
                        </td>

                        <td className="w-32 px-4 py-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            {transaction.type === "INCOME" ? (
                              <>
                                <CircleArrowUp className="w-4 h-4 text-green-500" />
                                <span className="text-green-600 text-sm font-medium">
                                  Entrada
                                </span>
                              </>
                            ) : (
                              <>
                                <CircleArrowDown className="w-4 h-4 text-red-500" />
                                <span className="text-red-600 text-sm font-medium">
                                  Saída
                                </span>
                              </>
                            )}
                          </div>
                        </td>

                        <td className="w-32 px-4 py-4 text-right">
                          <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                            {transaction.type === "INCOME" ? "+ " : "- "}
                            R$ {formatCurrency(transaction.amount)}
                          </p>
                        </td>

                        <td className="w-28 px-6 py-4">
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              onClick={() => setDeleteId(transaction.id)}
                              className="w-9 h-9 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center hover:bg-red-50 hover:border-red-100 transition-all"
                              title="Excluir"
                            >
                              <Trash className="w-4 h-4 text-danger" />
                            </Button>
                            <Button
                              onClick={() =>
                                modal.openEditModal(transaction as any)
                              }
                              className="w-9 h-9 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-200 transition-all"
                              title="Editar"
                            >
                              <SquarePen className="w-4 h-4 text-gray-800" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
                        <p className="text-sm font-medium">
                          Nenhuma transação encontrada
                        </p>
                        <p className="text-xs">
                          Tente ajustar seus filtros ou buscar por outro termo.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-5 flex items-center justify-between border-t border-gray-100 bg-gray-50/30">
            <div className="text-gray-500 text-sm font-medium">
              <span className="text-gray-900 font-bold">
                {from} a {to}
              </span>{" "}
              | {totalCount} resultados
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {totalPages > 0 &&
                [...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (totalPages > 5) {
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "default" : "ghost"}
                          className={`h-8 w-8 p-0 text-sm font-bold transition-all ${
                            page === pageNum
                              ? "bg-brand-base hover:bg-brand-dark text-white shadow-sm"
                              : "text-gray-500 hover:bg-gray-100"
                          }`}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return (
                        <span
                          key={pageNum}
                          className="text-gray-300 px-1 select-none"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "ghost"}
                      className={`h-8 w-8 p-0 text-sm font-bold transition-all ${
                        page === pageNum
                          ? "bg-brand-base hover:bg-brand-dark text-white shadow-sm"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || totalPages === 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TransactionModal
        open={modal.isOpen}
        onOpenChange={modal.closeModal}
        onSubmit={handleSubmitModal}
        categories={categories?.items ?? []}
        title={modal.mode === "create" ? "Nova Transação" : "Editar Transação"}
        defaultValues={modal.getDefaultValues()}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDeleteTransaction}
        title="Excluir transação"
        description={`Tem certeza que deseja excluir "${transactions?.items.find((t) => t.id === deleteId)?.description}"? Esta ação não pode ser desfeita.`}
      />
    </main>
  );
}
