"use client";

import type { ProductProps } from "@/types/product";
import { useProductList } from "@/hooks/useProductList";
import { ProductList } from "@/components/ProductList";
import { SearchBar } from "@/components/SearchBar";

type ProductsListProps = {
  initialProducts: ProductProps[];
};

export function ProductsList({ initialProducts }: ProductsListProps) {
  const { products, loading, error, search, setSearch, totalCount } =
    useProductList(initialProducts);

  return (
    <div>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        resultCount={totalCount}
      />
      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
}
