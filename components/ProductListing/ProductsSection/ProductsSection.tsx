"use client";

import type { ProductProps } from "@/types/product";
import { useProductList } from "@/hooks/useProductList";
import { ProductList } from "@/components/ProductListing/ProductList";
import { SearchBar } from "@/components/SearchBar";

type ProductsSectionProps = {
  initialProducts?: ProductProps[];
};

export function ProductsSection({ initialProducts }: ProductsSectionProps) {
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
