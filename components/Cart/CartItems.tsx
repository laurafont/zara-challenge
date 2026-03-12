"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/types/cart";
import { formatPrice } from "@/utils/formatPrice";
import { productPath } from "@/constants";
import { Button } from "@/components/UI/Button";
import { Text, Heading } from "@/components/UI/Typography";
import styles from "./CartItems.module.scss";

function CartItemRow({ item }: { item: CartItemType }) {
  const { removeItem } = useCart();

  return (
    <article
      className={styles.row}
      aria-label={`${item.name}, ${item.color}, ${item.storage}`}
      data-product-id={item.productId}
      data-color={item.color}
      data-storage={item.storage}
    >
      <Link href={productPath(item.productId)} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <Image
            src={item.imageUrl}
            alt={`${item.name} - ${item.color} - ${item.storage}`}
            fill
            className={styles.image}
            priority
            sizes="(max-width: 768px) 337px, (max-width: 480px) 260px, 510px"
          />
        </div>
      </Link>
      <div className={styles.details}>
        <div className={styles.detailsContent}>
          <Link href={productPath(item.productId)} className={styles.nameLink}>
            <Heading level="h2" className={styles.name}>
              {item.name}
            </Heading>
          </Link>
          <Text variant="body" as="p" className={styles.specs}>
            {item.storage} | {item.color}
          </Text>
          <Text variant="body" as="p" className={styles.unitPrice}>
            {formatPrice(item.unitPrice)}
          </Text>
        </div>
        <Button
          variant="text"
          type="button"
          onClick={() => removeItem({ id: item.id })}
          className={styles.removeLink}
          aria-label={`Eliminar ${item.name}`}
        >
          Eliminar
        </Button>
      </div>
    </article>
  );
}

export function CartItems() {
  const { cart } = useCart();

  return (
    <div className={styles.list} role="list">
      {cart.map((item) => (
        <CartItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}
