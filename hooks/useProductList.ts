import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProductProps } from "@/types/product";
import { fetchProducts } from "@/api/fetchProducts";
import { useDebounce } from "@/hooks/useDebounce";

const DEBOUNCE_MS = 300;
const STALE_TIME_MS = 3600 * 1000;

export function useProductList(initialProducts?: ProductProps[]) {
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, DEBOUNCE_MS);

  const hasInitialData = initialProducts !== undefined && debouncedQuery === "";

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", debouncedQuery],
    queryFn: () => fetchProducts(debouncedQuery),
    initialData: hasInitialData ? initialProducts : undefined,
    initialDataUpdatedAt: hasInitialData ? new Date().getTime() : undefined,
    staleTime: STALE_TIME_MS,
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
