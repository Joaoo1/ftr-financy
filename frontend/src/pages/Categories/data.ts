import { icons } from "lucide-react";

type IconName = keyof typeof icons;

export const PREDEFINED_COLORS = [
  { name: "Verde", value: "#10B981" },
  { name: "Azul", value: "#3B82F6" },
  { name: "Roxo", value: "#A855F7" },
  { name: "Pink", value: "#E11D48" },
  { name: "Vermelho", value: "#EF4444" },
  { name: "Laranja", value: "#F97316" },
  { name: "Dourado", value: "#D97706" },
];

export const PREDEFINED_ICONS: IconName[] = [
  "BriefcaseBusiness",
  "CarFront",
  "HeartPulse",
  "PiggyBank",
  "ShoppingCart",
  "Ticket",
  "ToolCase",
  "Utensils",
  "PawPrint",
  "House",
  "Gift",
  "Dumbbell",
  "BookOpen",
  "BaggageClaim",
  "Mailbox",
  "ReceiptText",
];
