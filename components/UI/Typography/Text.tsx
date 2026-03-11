import styles from "./typography.module.scss";
import clsx from "clsx";
import { TextProps } from "./types";

export default function Text({
  variant = "body",
  as: Component = "p",
  children,
  className,
}: TextProps) {
  return (
    <Component className={clsx(styles[variant], className)}>
      {children}
    </Component>
  );
}
