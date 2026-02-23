import { Link } from "react-router";
import {
  Wallet,
  CircleArrowUp,
  CircleArrowDown,
  ChevronRight,
  Plus,
} from "lucide-react";

import type { Transaction, Category } from "../types";
import { Button } from "../components/button";
import { useDashboard } from "../hooks/api/useDashboard";
import { Loading } from "../components/loading";
import { CategoryIcon } from "../components/category-icon";
import { lightenColor } from "../utils/colors";

export function Dashboard() {
  const { data, isLoading } = useDashboard();

  const totalBalance = data?.totalBalance ?? 0;
  const monthlyIncome = data?.monthlyIncome ?? 0;
  const monthlyExpenses = data?.monthlyExpense ?? 0;
  const recentTransactions = data?.transactions.items ?? [];
  const categories: Category[] = data?.categories.items ?? [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex-1 p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-purple-500" />
              <span className="text-gray-500 text-xs font-medium font-['Inter'] uppercase">
                Saldo total
              </span>
            </div>
            <div className="text-gray-900 text-xl sm:text-2xl lg:text-[28px] font-bold font-['Inter']">
              R${" "}
              {totalBalance.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CircleArrowUp className="w-5 h-5 text-green-500" />
              <span className="text-gray-500 text-xs font-medium font-['Inter'] uppercase">
                Receitas do mês
              </span>
            </div>
            <div className="text-gray-900 text-xl sm:text-2xl lg:text-[28px] font-bold font-['Inter']">
              R${" "}
              {monthlyIncome.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CircleArrowDown className="w-5 h-5 text-red-500" />
              <span className="text-gray-500 text-xs font-medium font-['Inter'] uppercase">
                Despesas do mês
              </span>
            </div>
            <div className="text-gray-900 text-xl sm:text-2xl lg:text-[28px] font-bold font-['Inter']">
              R${" "}
              {monthlyExpenses.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="pl-6 pr-1 py-3 border-b border-gray-200 flex justify-between items-center">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Transações recentes
              </p>
              <Link to="/transacoes">
                <Button variant="ghost" className="w-full text-brand-base">
                  Ver todas
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col overflow-x-auto min-h-100">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction: Transaction) => {
                  const date = new Date(transaction.date);
                  const formattedDate = date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  });

                  return (
                    <div
                      key={transaction.id}
                      className="border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center hover:bg-gray-50 transition-colors p-4 sm:p-0"
                    >
                      <div className="flex-1 flex items-center gap-4 py-4 sm:py-0 sm:h-20 px-4 sm:px-6">
                        <CategoryIcon
                          iconName={transaction.category.icon}
                          color={transaction.category.color}
                        />
                        <div className="flex flex-col gap-0.5">
                          <div className="text-gray-900 text-sm sm:text-base font-semibold font-['Inter']">
                            {transaction.description}
                          </div>
                          <div className="text-gray-500 text-xs sm:text-sm font-normal font-['Inter']">
                            {formattedDate}
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:flex h-20 items-center justify-center">
                        <div
                          className={`px-3 py-1 bg-[${lightenColor(transaction.category.color, 0.5)}] rounded-[999px] flex items-center w-fit`}
                        >
                          <span
                            className={`text-[${transaction.category.color}] text-xs font-medium font-['Inter']`}
                          >
                            {transaction.category?.title}
                          </span>
                        </div>
                      </div>

                      <div className="w-full sm:w-48 sm:h-20 px-4 sm:px-6 flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-gray-600 text-xs sm:hidden font-medium">
                          Valor:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 text-sm sm:text-base font-bold font-['Inter']">
                            {transaction.type === "INCOME" ? "+" : "-"} R${" "}
                            {transaction.amount.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          {transaction.type === "INCOME" ? (
                            <CircleArrowUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <CircleArrowDown className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                  <p>Nenhuma transação encontrada.</p>
                </div>
              )}

              <div className="py-4 flex items-center justify-center">
                <Link to="/nova-transacao">
                  <Button variant="ghost" className="w-full text-brand-base">
                    <Plus className="w-5 h-5" />
                    Nova transação
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-fit">
            <div className="pl-6 pr-1 py-3 border-b border-gray-200 flex justify-between items-center">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Categorias
              </p>
              <Link to="/categorias">
                <Button variant="ghost" className="w-full text-brand-base">
                  Gerenciar
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 min-h-75">
              {categories.length > 0 ? (
                categories.map((item) => {
                  const lightenedColor = lightenColor(item.color, 0.8);

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap"
                    >
                      <div
                        className="px-3 py-1 rounded-full flex items-center"
                        style={{ backgroundColor: lightenedColor }}
                      >
                        <p
                          className="text-xs font-medium"
                          style={{ color: item.color }}
                        >
                          {item.title}
                        </p>
                      </div>
                      <span className="flex-1 text-right text-gray-600 text-sm font-normal">
                        {item.transactionsCount} itens
                      </span>
                      <span className="w-24 text-right text-gray-900 text-sm font-semibold">
                        R${" "}
                        {item.transactionsTotalAmount.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <p>Sem categorias.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
