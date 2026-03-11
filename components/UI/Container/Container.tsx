import type { ReactNode } from "react";
import styles from "./Container.module.scss";

type ContainerProps = {
  children: ReactNode;
  size?: "default" | "small";
  className?: string;
};

export function Container({
  children,
  size = "default",
  className,
}: ContainerProps) {
  const sizeClass = size === "small" ? styles.sizeSmall : "";
  return (
    <div
      className={`${styles.container} ${sizeClass} ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );
}
