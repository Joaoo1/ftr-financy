import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { lightenColor } from "../utils/colors";

export const CategoryIcon = ({
  iconName,
  color,
}: {
  iconName: string;
  color: string;
}) => {
  const lightenedColor = lightenColor(color, 0.8);
  const props = { className: "w-5 h-5", style: { color } };

  const Icon = (LucideIcons as any)[iconName] as LucideIcon;

  return (
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}
      style={{ backgroundColor: lightenedColor }}
    >
      <Icon {...props} />
    </div>
  );
};
