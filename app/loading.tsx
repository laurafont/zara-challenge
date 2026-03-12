import { Container } from "@/components/UI/Container";
import styles from "./loading.module.scss";

const SKELETON_CARD_COUNT = 8;

export default function HomeLoading() {
  return (
    <Container>
      <div className={styles.searchBar} aria-hidden="true">
        <div className={styles.searchInput} />
        <div className={styles.searchResultCount} />
      </div>
      <ul className={styles.grid} aria-hidden="true">
        {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
          <li key={i} className={styles.card}>
            <div className={styles.cardImage} />
            <div className={styles.cardBody}>
              <div className={styles.cardTextGroup}>
                <div className={styles.cardBrand} />
                <div className={styles.cardName} />
              </div>
              <div className={styles.cardPrice} />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
