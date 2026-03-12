import { Container } from "@/components/UI/Container";
import styles from "./loading.module.scss";

const SPEC_ROW_COUNT = 5;
const STORAGE_PILL_COUNT = 3;
const COLOR_SWATCH_COUNT = 4;

export default function ProductLoading() {
  return (
    <>
      <Container>
        <div className={styles.backRow} aria-hidden="true">
          <div className={styles.backIcon} />
          <div className={styles.backLabel} />
        </div>
      </Container>

      <Container size="small" className={styles.wrapper}>
        <div className={styles.header} aria-hidden="true">
          <div className={styles.imageWrapper} />

          <div className={styles.infoColumn}>
            <div className={styles.info}>
              <div className={styles.productName} />
              <div className={styles.productPrice} />
            </div>

            <div className={styles.optionGroup}>
              <div className={styles.optionLabel} />
              <div className={styles.storagePills}>
                {Array.from({ length: STORAGE_PILL_COUNT }).map((_, i) => (
                  <div key={i} className={styles.storagePill} />
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <div className={styles.optionLabel} />
              <div className={styles.colorSwatches}>
                {Array.from({ length: COLOR_SWATCH_COUNT }).map((_, i) => (
                  <div key={i} className={styles.colorSwatch} />
                ))}
              </div>
            </div>

            <div className={styles.addButton} />
          </div>
        </div>

        <div className={styles.specs} aria-hidden="true">
          <div className={styles.specsTitle} />
          <div className={styles.specList}>
            {Array.from({ length: SPEC_ROW_COUNT }).map((_, i) => (
              <div key={i} className={styles.specRow}>
                <div className={styles.specTerm} />
                <div className={styles.specValue} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
