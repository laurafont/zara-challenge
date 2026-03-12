"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { ROUTES } from "@/constants";
import { Button } from "@/components/UI/Button";
import { Text } from "@/components/UI/Typography";
import styles from "./CartFooter.module.scss";

export function CartFooter({ isEmpty }: { isEmpty: boolean }) {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.unitPrice, 0);

  return (
    <footer className={styles.footer}>
      <Button href={ROUTES.HOME} className={styles.continueBtn}>
        Continue Shopping
      </Button>
      {!isEmpty && (
        <div className={styles.totalBlock}>
          <div className={styles.totalPrice}>
            <Text variant="label" as="span">
              Total
            </Text>
            <Text variant="label" as="span">
              {formatPrice(total)}
            </Text>
          </div>
          <Button href={ROUTES.HOME} className={styles.payBtn}>
            Pay
          </Button>
        </div>
      )}
    </footer>
  );
}
