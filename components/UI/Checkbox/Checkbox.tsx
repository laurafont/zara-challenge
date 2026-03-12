import { useId } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "onChange" | "className" | "style"
>;

export function Checkbox({
  checked,
  onChange,
  id,
  name,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className,
  style,
  children,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={[styles.wrapper, className ?? ""]
        .filter(Boolean)
        .join(" ")
        .trim()}
      style={style}
    >
      <input
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={styles.input}
        {...rest}
      />
      <span className={styles.box} aria-hidden="true">
        {children}
      </span>
    </label>
  );
}
