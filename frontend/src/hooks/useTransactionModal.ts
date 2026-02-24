import { useState } from "react";
import type { Transaction } from "../types";
import type { CreateTransactionInput } from "../schemas/createTransaction";

interface TransactionModalState {
  open: boolean;
  mode: "create" | "edit";
  transaction?: Transaction;
}

export function useTransactionModal() {
  const [state, setState] = useState<TransactionModalState>({
    open: false,
    mode: "create",
  });

  const openCreateModal = () => {
    setState({
      open: true,
      mode: "create",
    });
  };

  const openEditModal = (transaction: Transaction) => {
    setState({
      open: true,
      mode: "edit",
      transaction,
    });
  };

  const closeModal = () => {
    setState({
      open: false,
      mode: "create",
    });
  };

  const getDefaultValues = (): Partial<CreateTransactionInput> | undefined => {
    if (state.mode === "edit" && state.transaction) {
      return {
        description: state.transaction.description,
        amount: state.transaction.amount,
        type: state.transaction.type,
        date: state.transaction.date,
        categoryId: state.transaction.category.id,
      };
    }
    return undefined;
  };

  return {
    isOpen: state.open,
    mode: state.mode,
    transaction: state.transaction,
    openCreateModal,
    openEditModal,
    closeModal,
    getDefaultValues,
  };
}
