import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonPropsBase = {
  variant?: "default" | "text";
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonPropsBase & {
    href?: never;
  };

type ButtonAsLink = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> &
  ButtonPropsBase & {
    href: string;
    onClick?: never;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "default", className, children, ...rest } = props;
  const variantClass = variant === "text" ? styles.text : "";
  const buttonClassName = [styles.button, variantClass, className ?? ""]
    .filter(Boolean)
    .join(" ")
    .trim();

  if ("href" in rest && rest.href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={rest.href} className={buttonClassName} {...linkProps}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={buttonClassName}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
