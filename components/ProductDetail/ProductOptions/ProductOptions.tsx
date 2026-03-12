import { useState } from "react";
import type { ProductColorOption, ProductStorageOption } from "@/types/product";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/Checkbox";
import { Text } from "@/components/UI/Typography";
import styles from "./ProductOptions.module.scss";

type ProductOptionsProps = {
  colorOptions: ProductColorOption[];
  storageOptions: ProductStorageOption[];
  selectedColor: ProductColorOption | null;
  selectedStorage: ProductStorageOption | null;
  onColorSelect: (color: ProductColorOption) => void;
  onStorageSelect: (storage: ProductStorageOption) => void;
};

export function ProductOptions({
  colorOptions,
  storageOptions,
  selectedColor,
  selectedStorage,
  onColorSelect,
  onStorageSelect,
}: ProductOptionsProps) {
  const [hoveredColor, setHoveredColor] = useState<ProductColorOption | null>(
    null
  );
  const displayedColorName = hoveredColor ?? selectedColor;

  return (
    <div className={styles.selectors} aria-label="Product options">
      {storageOptions.length > 0 && (
        <div className={styles.selectorGroup}>
          <Text variant="label" as="p">
            Storage. How much space do you need?
          </Text>
          <div
            className={styles.storageOptions}
            role="group"
            aria-label="Storage"
          >
            {storageOptions.map((storage) => (
              <Button
                key={storage.capacity}
                className={`${styles.storageButton} ${selectedStorage?.capacity === storage.capacity ? styles.selected : ""}`}
                onClick={() => onStorageSelect(storage)}
                aria-pressed={selectedStorage?.capacity === storage.capacity}
              >
                {storage.capacity}
              </Button>
            ))}
          </div>
        </div>
      )}

      {colorOptions.length > 0 && (
        <div className={styles.selectorGroup}>
          <Text variant="label" as="p">
            Color. Pick your favourite.
          </Text>
          <div className={styles.colorGroup}>
            <div
              className={styles.colorOptions}
              role="group"
              aria-label="Color"
            >
              {colorOptions.map((color) => (
                <div
                  key={color.name}
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                  onFocus={() => setHoveredColor(color)}
                  onBlur={() => setHoveredColor(null)}
                >
                  <Checkbox
                    checked={selectedColor?.name === color.name}
                    onChange={() => onColorSelect(color)}
                    className={`${styles.colorButton} ${selectedColor?.name === color.name ? styles.selected : ""}`}
                    style={{ ["--color" as string]: color.hexCode }}
                    aria-label={color.name}
                    title={color.name}
                  />
                </div>
              ))}
            </div>
            {displayedColorName && (
              <Text variant="body" as="p" className={styles.colorLabel}>
                {displayedColorName.name}
              </Text>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
