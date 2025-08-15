import { twclsx } from "@/utils/twclsx";
import { FunctionComponent, ReactNode } from "react";

interface BadgeProps {
  label: string;
  icon?: ReactNode;
  className?: string;
}

const Badge: FunctionComponent<BadgeProps> = ({ label, icon, className }) => {
  return (
    <span
      className={twclsx(
        "mx-1.5 rounded-3xl bg-orange-light px-[3px] text-xs font-medium leading-4 tracking-tight text-orange-dark",
        {
          "gap-1": icon,
        },
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
};

export default Badge;
