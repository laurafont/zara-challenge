import type { SimilarProduct } from "@/types/product";
import { ProductCard } from "@/components/ProductListing/ProductCard";
import { Heading } from "@/components/UI/Typography";
import { Carousel } from "@/components/UI/Carousel";
import styles from "./SimilarItems.module.scss";
import { Container } from "../UI/Container";

type SimilarItemsProps = {
  products: SimilarProduct[];
};

export function SimilarItems({ products }: SimilarItemsProps) {
  if (products.length === 0) return null;

  return (
    <Container
      size="small"
      as="section"
      className={styles.section}
      aria-labelledby="similar-heading"
    >
      <Heading id="similar-heading" level="h2" className={styles.title}>
        Similar Items
      </Heading>
      <div className={styles.carouselWrap}>
        <Carousel className={styles.carousel} aria-label="Similar products">
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className={styles.item}
              role="listitem"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}
