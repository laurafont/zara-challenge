"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type {
  ProductColorOption,
  ProductDetailProps,
  ProductStorageOption,
} from "@/types/product";
import { ProductItemSpecs } from "@/components/ProductDetail/ProductItemSpecs/ProductItemSpecs";
import { ProductOptions } from "@/components/ProductDetail/ProductOptions/ProductOptions";
import { Button } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import Image from "next/image";
import { Text } from "@/components/UI/Typography";
import { Heading } from "@/components/UI/Typography";
import { formatPrice } from "@/utils/formatPrice";
import styles from "./ProductItem.module.scss";
import { ROUTES } from "@/constants/routes";
import { ArrowLeftIcon } from "../../UI/Icons";
import { SimilarItems } from "../../SimilarItems";
import { useRouter } from "next/navigation";

type ProductItemProps = {
  product: ProductDetailProps;
};

export function ProductItem({ product }: ProductItemProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<ProductColorOption | null>(
    null
  );
  const [selectedStorage, setSelectedStorage] =
    useState<ProductStorageOption | null>(null);

  const currentPrice = product.basePrice + (selectedStorage?.price ?? 0);

  const canAddToCart = selectedColor !== null && selectedStorage !== null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;
    addItem({
      productId: product.id,
      brand: product.brand,
      name: product.name,
      color: selectedColor.name,
      storage: selectedStorage.capacity,
      imageUrl: selectedColor.imageUrl,
      unitPrice: currentPrice,
    });
    router.push(ROUTES.CART);
  };

  const displayImageUrl =
    selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl ?? "";

  return (
    <>
      <Container as="section">
        <Link href={ROUTES.HOME}>
          <div className={styles.backIcon}>
            <ArrowLeftIcon />
            <Text variant="label" as="span">
              Back
            </Text>
          </div>
        </Link>
      </Container>
      <Container size="small" as="section" className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.imageWrapper}>
            <Image
              src={displayImageUrl}
              alt={`${product.name} – ${product.brand}`}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className={styles.infoColumn}>
            <div className={styles.info}>
              <Heading level="h1" className={styles.name}>
                {product.name}
              </Heading>
              <Text variant="body" as="p" className={styles.price}>
                From {formatPrice(currentPrice)}
              </Text>
            </div>
            <ProductOptions
              colorOptions={product.colorOptions}
              storageOptions={product.storageOptions}
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
              onColorSelect={setSelectedColor}
              onStorageSelect={setSelectedStorage}
            />
            <Button disabled={!canAddToCart} onClick={handleAddToCart}>
              Añadir
            </Button>
          </div>
        </div>

        <ProductItemSpecs product={product} />
      </Container>
      <Container size="small" as="section">
        {product.similarProducts.length > 0 && (
          <SimilarItems products={product.similarProducts} />
        )}
      </Container>
    </>
  );
}
