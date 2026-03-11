import styles from "./typography.module.scss";
import clsx from "clsx";
import { HeadingProps } from "./types";
import { HeadingLevel } from "./types";

export default function Heading({
  level = "h1",
  children,
  className,
}: HeadingProps) {
  const Tag = level as HeadingLevel;

  return <Tag className={clsx(styles[level], className)}>{children}</Tag>;
}
