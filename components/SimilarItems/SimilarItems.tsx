"use client";

import type { SimilarProduct } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { Heading } from "@/components/UI/Typography";
import { Carousel } from "@/components/UI/Carousel";
import styles from "./SimilarItems.module.scss";

type SimilarItemsProps = {
  products: SimilarProduct[];
};

export function SimilarItems({ products }: SimilarItemsProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="similar-heading">
      <div id="similar-heading">
        <Heading level="h2" className={styles.title}>
          Similar Items
        </Heading>
      </div>
      <div className={styles.carouselWrap}>
        <Carousel className={styles.carousel} aria-label="Similar products">
          {products.map((product) => (
            <div key={product.id} className={styles.item} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
