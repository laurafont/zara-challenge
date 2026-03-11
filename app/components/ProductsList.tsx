"use client";

import type { ProductProps } from "@/types/product";
import { useProductList } from "@/hooks/useProductList";
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
      {loading && <p>Loading…</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && <p>Products: {totalCount}</p>}
    </div>
  );
}
