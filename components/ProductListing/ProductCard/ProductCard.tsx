import Image from "next/image";
import Link from "next/link";
import { productPath } from "@/constants/routes";
import type { ProductProps } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { Heading, Text } from "@/components/UI/Typography";
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
            <Text variant="overline" as="span" className={styles.brand}>
              {brand}
            </Text>
            <Heading className={styles.name} level="h2">
              {name}
            </Heading>
          </div>
          <Text as="p" className={styles.price}>
            {formatPrice(basePrice)}
          </Text>
        </div>
      </Link>
    </article>
  );
}
