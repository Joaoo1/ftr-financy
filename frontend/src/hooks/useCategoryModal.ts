import { useState } from "react";
import type { Category } from "../types";
import type { CreateCategoryInput } from "../schemas/createCategory";

interface CategoryModalState {
  open: boolean;
  mode: "create" | "edit";
  category?: Category;
}

export function useCategoryModal() {
  const [state, setState] = useState<CategoryModalState>({
    open: false,
    mode: "create",
  });

  const openCreateModal = () => {
    setState({
      open: true,
      mode: "create",
    });
  };

  const openEditModal = (category: Category) => {
    setState({
      open: true,
      mode: "edit",
      category,
    });
  };

  const closeModal = () => {
    setState({
      open: false,
      mode: "create",
    });
  };

  const getDefaultValues = (): Partial<CreateCategoryInput> | undefined => {
    if (state.mode === "edit" && state.category) {
      return {
        title: state.category.title,
        description: state.category.description ?? "",
        color: state.category.color,
        icon: state.category.icon,
      };
    }
    return undefined;
  };

  return {
    isOpen: state.open,
    mode: state.mode,
    category: state.category,
    openCreateModal,
    openEditModal,
    closeModal,
    getDefaultValues,
  };
}
