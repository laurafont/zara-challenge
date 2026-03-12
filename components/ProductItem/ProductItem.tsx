"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/context/CartContext";
import type {
  ProductColorOption,
  ProductDetailProps,
  ProductStorageOption,
} from "@/types/product";
import { ProductItemSpecs } from "@/components/ProductItemSpecs";
import { ProductOptions } from "@/components/ProductOptions/ProductOptions";
import { Button } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import Image from "next/image";
import { Text } from "@/components/UI/Typography";
import { Heading } from "@/components/UI/Typography";
import { formatPrice } from "@/utils/formatPrice";
import styles from "./ProductItem.module.scss";
import { ROUTES } from "@/constants";
import { ArrowLeftIcon } from "../UI/Icons";
import { SimilarItems } from "../SimilarItems";
import { notFound, useRouter } from "next/navigation";

type ProductItemProps = {
  productId: string;
  initialProduct?: ProductDetailProps | null;
};

export function ProductItem({ productId, initialProduct }: ProductItemProps) {
  const { product, loading, error } = useProduct(productId, {
    initialData: initialProduct,
  });
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<ProductColorOption | null>(
    null
  );
  const [selectedStorage, setSelectedStorage] =
    useState<ProductStorageOption | null>(null);

  const currentPrice = useMemo(() => {
    if (!product) return 0;
    return product.basePrice + (selectedStorage?.price ?? 0);
  }, [product, selectedStorage]);

  const canAddToCart =
    selectedColor !== null && selectedStorage !== null && product !== null;

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedStorage) return;
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

  if (loading) {
    return (
      <Container size="small">
        <p className={styles.message}>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="small">
        <p className={`${styles.message} ${styles.error}`} role="alert">
          {error.message}
        </p>
      </Container>
    );
  }

  if (!product) {
    notFound();
  }

  const displayImageUrl =
    selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl ?? "";

  return (
    <>
      <Container>
        <Link href={ROUTES.HOME}>
          <div className={styles.backIcon}>
            <ArrowLeftIcon />
            <Text variant="label" as="span">
              Back
            </Text>
          </div>
        </Link>
      </Container>
      <Container size="small" className={styles.wrapper}>
        <section className={styles.header}>
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
        </section>

        <ProductItemSpecs product={product} />
      </Container>
      <Container size="small">
        {product.similarProducts.length > 0 && (
          <SimilarItems products={product.similarProducts} />
        )}
      </Container>
    </>
  );
}
