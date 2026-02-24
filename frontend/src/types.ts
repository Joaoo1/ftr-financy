export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  transactionsCount?: number;
  transactionsTotalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export const TransactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}
