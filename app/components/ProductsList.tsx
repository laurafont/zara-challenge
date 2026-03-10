"use client";

import Image from "next/image";
import type { ProductProps } from "@/types/product";
import { useProductList } from "@/hooks/useProductList";

type ProductsListProps = {
  initialProducts: ProductProps[];
};

export function ProductsList({ initialProducts }: ProductsListProps) {
  const { products, loading, error, search, setSearch, totalCount } =
    useProductList(initialProducts);

  console.log(products);

  return (
    <div>
      <p>Products: {totalCount}</p>
    </div>
  );
}
