import type { ReactNode } from "react";

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}
