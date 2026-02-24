import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { lightenColor } from "../utils/colors";

const sizes = {
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

interface CategoryIconProps {
  iconName: string;
  color: string;
  size?: keyof typeof sizes;
  hasBackground?: boolean;
}

export const CategoryIcon = ({
  iconName,
  color,
  size,
  hasBackground = true,
}: CategoryIconProps) => {
  const lightenedColor = lightenColor(color, 0.9);

  const sizeClass = sizes[size || "md"];
  const props = { className: sizeClass, style: { color } };

  const Icon = (LucideIcons as any)[iconName] as LucideIcon;

  return (
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}
      style={{
        backgroundColor: hasBackground ? lightenedColor : "transparent",
      }}
    >
      <Icon {...props} />
    </div>
  );
};
