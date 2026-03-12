"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/context/CartContext";
import { CartIcon as CartIconSvg, CartIconFilled } from "@/components/UI/Icons";
import styles from "./CartIcon.module.scss";

type CartIconProps = {
  className?: string;
};

export function CartIcon({ className }: CartIconProps) {
  const { cart } = useCart();
  const count = cart.length;
  const ariaLabel = `${count} items in cart`;

  return (
    <Link href={ROUTES.CART} className={className} aria-label={ariaLabel}>
      <span className={styles.wrapper}>
        {count > 0 ? <CartIconFilled /> : <CartIconSvg />}
        <span className={styles.count} aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      </span>
    </Link>
  );
}
