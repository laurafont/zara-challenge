"use client";

import type { ProductDetailProps } from "@/types/product";
import { Heading } from "@/components/UI/Typography";
import styles from "./ProductItemSpecs.module.scss";

type ProductItemSpecsProps = {
  product: ProductDetailProps;
};

function SpecRow({ term, value }: { term: string; value: string }) {
  return (
    <div className={styles.specRow}>
      <dt className={styles.specTerm}>{term}</dt>
      <dd className={styles.specValue}>{value}</dd>
    </div>
  );
}

export function ProductItemSpecs({ product }: ProductItemSpecsProps) {
  const { brand, name, description, specs } = product;

  return (
    <section className={styles.specs} aria-label="Specifications">
      <Heading level="h3" className={styles.title}>
        Specifications
      </Heading>
      <dl className={styles.specList}>
        <SpecRow term="Brand" value={brand} />
        <SpecRow term="Name" value={name} />
        <SpecRow term="Description" value={description} />
        {Object.entries(specs).map(([key, value]) => (
          <SpecRow key={key} term={key} value={value} />
        ))}
      </dl>
    </section>
  );
}
