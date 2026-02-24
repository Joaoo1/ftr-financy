import { Search } from "lucide-react";
import type { Category } from "../../../types";
import { generatePeriodOptions } from "../../../utils/date";
import { Input } from "../../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";

interface FilterProps {
  filters: any;
  setFilters: any;
  setPage: any;
  categories: Category[];
}

export const Filters = ({
  filters,
  setFilters,
  setPage,
  categories,
}: FilterProps) => {
  const periodOptions = generatePeriodOptions();

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-50">
        <label className="text-gray-700 text-sm font-semibold block mb-2">
          Buscar
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por descrição"
            value={filters.search}
            onChange={(e) => {
              setFilters({ ...filters, search: e.target.value });
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      <div className="w-45">
        <label className="text-gray-700 text-sm font-semibold block mb-2">
          Tipo
        </label>
        <Select
          value={filters.type}
          onValueChange={(value) => {
            setFilters({ ...filters, type: value });
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="INCOME">Entrada</SelectItem>
            <SelectItem value="EXPENSE">Saída</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-50">
        <label className="text-gray-700 text-sm font-semibold block mb-2">
          Categoria
        </label>
        <Select
          value={filters.category}
          onValueChange={(value) => {
            setFilters({ ...filters, category: value });
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((cat: Category) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-50">
        <label className="text-gray-700 text-sm font-semibold block mb-2">
          Período
        </label>
        <Select
          value={filters.period}
          onValueChange={(value) => {
            setFilters({ ...filters, period: value });
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os períodos</SelectItem>
            {periodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
