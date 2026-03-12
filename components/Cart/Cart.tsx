"use client";

import { useCart } from "@/context/CartContext";
import { CartItems } from "@/components/Cart/CartItems";
import { CartFooter } from "@/components/Cart/CartFooter";
import { Container } from "@/components/UI/Container";
import styles from "./Cart.module.scss";
import { Heading } from "@/components/UI/Typography";

export function Cart() {
  const { cart } = useCart();

  return (
    <Container>
      <section className={styles.cart} aria-label="Cart">
        <div className={styles.cartMain}>
          <Heading level="h1">CART ({cart.length})</Heading>
          <CartItems />
        </div>
        <CartFooter isEmpty={cart.length === 0} />
      </section>
    </Container>
  );
}
