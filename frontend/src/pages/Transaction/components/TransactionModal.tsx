import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/form";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";
import {
  type CreateTransactionInput,
  createTransactionSchema,
} from "../../../schemas/createTransaction";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { formatCurrency, parseCurrency } from "../../../utils/currency";
import { type Category } from "../../../types";
import { cn } from "tailwind-variants";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTransactionInput) => void;
  categories: Category[];
  isLoading?: boolean;
  title?: string;
  defaultValues?: Partial<CreateTransactionInput>;
}

export function TransactionModal({
  open,
  onOpenChange,
  onSubmit,
  categories,
  isLoading = false,
  title = "Nova transação",
  defaultValues,
}: TransactionModalProps) {
  const form = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
      ...defaultValues,
    },
  });

  useEffect(() => {
    form.reset({
      type: defaultValues?.type || "EXPENSE",
      amount: defaultValues?.amount || 0,
      description: defaultValues?.description || "",
      date: defaultValues?.date || new Date().toISOString().split("T")[0],
      categoryId: defaultValues?.categoryId,
    });
  }, [defaultValues]);

  const handleSubmit = (data: CreateTransactionInput) => {
    onSubmit(data);
    form.reset();
  };

  const transactionType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-106.25 bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p className="text-gray-500 text-sm mt-1">
            Registre sua despesa ou receita
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4 rounded-xl border p-1 border-gray-200">
              <Button
                variant="ghost"
                onClick={() => form.setValue("type", "EXPENSE")}
                className={cn(
                  "flex items-center justify-center gap-2 h-13 rounded-xl border-2 transition-all font-semibold text-sm",
                  transactionType === "EXPENSE"
                    ? "border-red-base text-gray-800"
                    : "border-transparent text-gray-600",
                )}
              >
                <CircleArrowDown
                  className={cn(
                    "w-5 h-5",
                    transactionType === "EXPENSE"
                      ? "text-red-base"
                      : "text-gray-600",
                  )}
                />
                Despesa
              </Button>
              <Button
                variant="ghost"
                onClick={() => form.setValue("type", "INCOME")}
                className={cn(
                  "flex items-center justify-center gap-2 h-13 rounded-xl border-2 transition-all font-semibold text-sm",
                  transactionType === "INCOME"
                    ? "border-green-base text-gray-800"
                    : "border-transparent text-gray-600",
                )}
              >
                <CircleArrowUp
                  className={cn(
                    "w-5 h-5",
                    transactionType === "INCOME"
                      ? "text-green-base"
                      : "text-gray-600",
                  )}
                />
                Receita
              </Button>
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex. Almoço no restaurante"
                      required
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and Value */}
            <div className="grid grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="date" required {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-900">
                          R$
                        </span>
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="0,00"
                          required
                          className="pl-10"
                          value={field.value ? formatCurrency(field.value) : ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(parseCurrency(value));
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Categoria</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-gray-200 bg-white w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border-gray-200">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="focus:bg-gray-50 focus:text-gray-900"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            {category.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
