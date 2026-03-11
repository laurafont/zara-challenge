import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "disabled" | "type" | "onClick" | "className"
>;

export function Button({
  children,
  disabled = false,
  type = "button",
  onClick,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className ?? ""}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
