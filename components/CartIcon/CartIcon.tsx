"use client";

import Link from "next/link";
import { ROUTES } from "@/constants";
import { useCart } from "@/context/CartContext";
import { CartIcon as CartIconSvg } from "@/components/UI/Icons";
import styles from "./CartIcon.module.scss";

type CartIconProps = {
  className?: string;
};

export function CartIcon({ className }: CartIconProps) {
  const { cart } = useCart();
  const count = cart.length;
  const ariaLabel = count === 0 ? "Cart" : `${count} items in cart`;

  return (
    <Link href={ROUTES.CART} className={className} aria-label={ariaLabel}>
      <span className={styles.wrapper}>
        <CartIconSvg />
        {count > 0 && (
          <span className={styles.count} aria-hidden="true">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </span>
    </Link>
  );
}
