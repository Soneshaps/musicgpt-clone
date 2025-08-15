"use client";

import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ButtonSizes, ButtonVariants } from ".";
import { twclsx } from "@/utils/twclsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  loading?: boolean;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  onClick?: () => void;
  children?: ReactNode;
  borderLess?: boolean;
}
const Button: FC<ButtonProps> = ({
  label,
  className,
  loading,
  variant = ButtonVariants.PRIMARY,
  type = "button",
  size = ButtonSizes.BASE,
  onClick,
  disabled,
  children,
  borderLess = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={twclsx(
        "group relative flex h-9 shrink-0 grow-0 select-none items-center justify-center gap-1 rounded-full text-sm transition-all duration-200 ease-in-out hover:cursor-pointer",
        {
          "px-2 py-2": size === ButtonSizes.SMALL,
          "px-2.5": size === ButtonSizes.BASE,
          "px-3 py-4": size === ButtonSizes.LARGE,
        },
        {
          "duration:100 border border-neutral-600 text-white hover:border-neutral-600 hover:bg-neutral-sub-text/20 active:scale-95":
            variant === ButtonVariants.PRIMARY,
        },
        {
          "active:scale-96 h-11 border border-neutral-300 px-[12px] leading-tight tracking-wide hover:border-neutral-500 hover:bg-neutral-200":
            variant === ButtonVariants.TRANSPARENT,
        },
        {
          "border-none": borderLess,
        },
        {
          "pointer-events-none !bg-neutral-500/50": loading || disabled,
          "bg-scale-1": loading,
        },
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {label ? label : ""}
      {children}
    </button>
  );
};

export default Button;
