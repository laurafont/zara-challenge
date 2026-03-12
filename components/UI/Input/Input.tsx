import type { ChangeEvent } from "react";
import { Label } from "@/components/UI/Label";
import styles from "./Input.module.scss";

type InputProps = {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "search" | "email" | "password" | "tel" | "url";
  label?: string;
  labelHidden?: boolean;
  placeholder?: string;
  className?: string;
};

export function Input({
  id,
  value,
  onChange,
  type = "text",
  label,
  labelHidden = false,
  placeholder,
  className,
}: InputProps) {
  const inputEl = (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${className ?? ""}`.trim()}
    />
  );

  if (label) {
    const labelClassName = labelHidden ? "srOnly" : styles.label;
    return (
      <div>
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
        {inputEl}
      </div>
    );
  }

  return inputEl;
}
