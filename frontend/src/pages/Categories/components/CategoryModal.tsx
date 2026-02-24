import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "tailwind-variants";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
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
import { PREDEFINED_COLORS, PREDEFINED_ICONS } from "../data";
import {
  createCategorySchema,
  type CreateCategoryInput,
} from "../../../schemas/createCategory";

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateCategoryInput) => void;
  isLoading?: boolean;
  title?: string;
  defaultValues?: Partial<CreateCategoryInput>;
}

export function CategoryModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  title = "Nova categoria",
  defaultValues,
}: CategoryModalProps) {
  const [selectedColor, setSelectedColor] = useState(
    defaultValues?.color || PREDEFINED_COLORS[0].value,
  );
  const [selectedIcon, setSelectedIcon] = useState(
    defaultValues?.icon || PREDEFINED_ICONS[0],
  );

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      color: PREDEFINED_COLORS[0].value,
      icon: PREDEFINED_ICONS[0],
      ...defaultValues,
    },
  });

  useEffect(() => {
    form.reset({
      color: defaultValues?.color || PREDEFINED_COLORS[0].value,
      icon: defaultValues?.icon || PREDEFINED_ICONS[0],
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    });

    setSelectedColor(defaultValues?.color || PREDEFINED_COLORS[0].value);
    setSelectedIcon(defaultValues?.icon || PREDEFINED_ICONS[0]);
  }, [defaultValues]);

  const handleSubmit = (data: CreateCategoryInput) => {
    onSubmit(data);
    form.reset();
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    form.setValue("color", color);
  };

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    form.setValue("icon", iconName);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-106.25 bg-white border-gray-200"
      >
        <DialogClose>
          <LucideIcons.X className="size-4" />
        </DialogClose>

        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. Alimentação" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição da categoria" {...field} />
                  </FormControl>
                  <p className="text-xs text-gray-500 font-normal -mt-2">
                    Opcional
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={() => (
                <FormItem className="space-y-3">
                  <FormLabel>Ícone</FormLabel>
                  <div className="grid grid-cols-8 gap-2">
                    {PREDEFINED_ICONS.map((iconName) => {
                      const Icon = (LucideIcons as any)[iconName] as LucideIcon;
                      return (
                        <Button
                          key={iconName}
                          variant="ghost"
                          onClick={() => handleIconSelect(iconName)}
                          className={cn(
                            "rounded-lg border",
                            selectedIcon === iconName
                              ? "border-brand-base bg-white text-[#1e293b]"
                              : "border-slate-200 hover:border-slate-300 bg-white text-slate-500",
                          )}
                        >
                          {Icon && (
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={() => (
                <FormItem className="space-y-3">
                  <FormLabel>Cor</FormLabel>
                  <div className="grid grid-cols-7 gap-2">
                    {PREDEFINED_COLORS.map((color) => (
                      <Button
                        variant="ghost"
                        key={color.value}
                        onClick={() => handleColorSelect(color.value)}
                        className={cn(
                          "rounded-lg border p-1",
                          selectedColor === color.value
                            ? "border-brand-base"
                            : "border-gray-300",
                        )}
                      >
                        <div
                          className="p-1 w-full h-full rounded-lg"
                          style={{ backgroundColor: color.value }}
                        />
                      </Button>
                    ))}
                  </div>
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
