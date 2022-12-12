import * as Heroicons from "@heroicons/react/24/outline";
import clsx from "clsx";
export type IconEnum = keyof typeof Heroicons;

export interface IconProps {
  name: IconEnum;
  color?:
    | "light"
    | "neutral"
    | "dark"
    | "brand"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
}

export const Icon = ({ name, color, size }: IconProps) => {
  const IconComponent = Heroicons[name];

  let iconColor = "text-zinc-400";
  switch (color) {
    case "light":
      iconColor = "text-zinc-300";
      break;
    case "neutral":
      iconColor = "text-zinc-400";
      break;
    case "dark":
      iconColor = "text-zinc-600";
      break;
    case "brand":
      iconColor = "text-brand-500";
      break;
    case "success":
      iconColor = "text-success-500";
      break;
    case "warning":
      iconColor = "text-warning-500";
      break;
    case "danger":
      iconColor = "text-danger-500";
      break;
    default:
      iconColor = "text-zinc-400";
      break;
  }

  let iconSize = "w-6 h-6";
  switch (size) {
    case "sm":
      iconSize = "w-4 h-4";
      break;
    case "md":
      iconSize = "w-5 h-5";
      break;
    case "lg":
      iconSize = "w-6 h-6";
      break;
    default:
      iconSize = "w-6 h-6";
      break;
  }

  return (
    <div className={clsx(iconColor, iconSize)}>
      <IconComponent />
    </div>
  );
};
