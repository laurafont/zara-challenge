import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProductProps } from "@/types/product";
import { fetchProducts } from "@/api/fetchProducts";
import { useDebounce } from "@/hooks/useDebounce";

const DEBOUNCE_MS = 300;

export function useProductList(initialProducts?: ProductProps[]) {
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, DEBOUNCE_MS);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products", debouncedQuery],
    queryFn: () => fetchProducts(debouncedQuery),
    initialData:
      initialProducts !== undefined && debouncedQuery === ""
        ? initialProducts
        : undefined,
    placeholderData: keepPreviousData,
  });

  return {
    products,
    loading: isLoading,
    error: error ?? null,
    search,
    setSearch,
    totalCount: products.length,
  };
}
