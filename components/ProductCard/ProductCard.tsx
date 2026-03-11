import Image from "next/image";
import Link from "next/link";
import { productPath } from "@/constants";
import type { ProductProps } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: ProductProps;
};

export function ProductCard({ product }: ProductCardProps) {
  const { id, brand, name, basePrice, imageUrl } = product;
  const imageAlt = `${name} – ${brand}`;

  return (
    <article className={styles.card}>
      <Link href={productPath(id)} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 337px, (max-width: 480px) 260px, 510px"
          />
        </div>
        <div className={styles.body}>
          <div>
            <span className={styles.brand}>{brand}</span>
            <h2 className={styles.name}>{name}</h2>
          </div>
          <p className={styles.price}>{formatPrice(basePrice)}</p>
        </div>
      </Link>
    </article>
  );
}
