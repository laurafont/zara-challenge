import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.scss";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  size?: "default" | "small";
  className?: string;
};

export function Container({
  children,
  as: Tag = "div",
  size = "default",
  className,
}: ContainerProps) {
  const sizeClass = size === "small" ? styles.sizeSmall : "";
  return (
    <Tag
      className={`${styles.container} ${sizeClass} ${className ?? ""}`.trim()}
    >
      {children}
    </Tag>
  );
}
