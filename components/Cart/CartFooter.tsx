"use client";

import { formatPrice } from "@/utils/formatPrice";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/UI/Button";
import { Text } from "@/components/UI/Typography";
import styles from "./CartFooter.module.scss";

export function CartFooter({
  isEmpty,
  total,
}: {
  isEmpty: boolean;
  total: number;
}) {
  return (
    <footer className={styles.footer}>
      <Button
        variant="outline"
        href={ROUTES.HOME}
        className={styles.continueBtn}
      >
        Continue Shopping
      </Button>
      {!isEmpty && (
        <>
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
        </>
      )}
    </footer>
  );
}
