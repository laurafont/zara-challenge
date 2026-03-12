import type { ProductProps } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import styles from "./ProductList.module.scss";
import { Heading } from "../UI/Typography";

type ProductListProps = {
  products: ProductProps[];
  loading: boolean;
  error: Error | null;
};

export function ProductList({ products, loading, error }: ProductListProps) {
  if (error) {
    return (
      <p className={`${styles.message} ${styles.error}`} role="alert">
        {error.message}
      </p>
    );
  }

  if (loading && products.length === 0) {
    return (
      <p className={styles.message} aria-busy="true">
        Loading...
      </p>
    );
  }

  if (products.length === 0) {
    return <p className={styles.message}>No results.</p>;
  }

  return (
    <>
      <Heading level="h2" className="srOnly">
        Products
      </Heading>
      <ul className={styles.grid} key={products.map((p) => p.id).join(",")}>
        {products.map((product, index) => (
          <li
            key={`${product.id}-${index}`}
            className={styles.gridItem}
            style={{ "--i": index } as React.CSSProperties}
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
