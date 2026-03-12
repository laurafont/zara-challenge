import { useQuery } from "@tanstack/react-query";
import type { ProductDetailProps } from "@/types/product";
import { getProduct } from "@/api/getProduct";

type UseProductOptions = {
  initialData?: ProductDetailProps | null;
};

//Fetches a single product by id. Pass initialData from server for SSR.
export function useProduct(id: string, options?: UseProductOptions) {
  const { initialData } = options ?? {};
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
    initialData: initialData ?? undefined,
  });

  return {
    product: id ? (product ?? null) : null,
    loading: id ? isLoading : false,
    error: id ? (error ?? null) : null,
    refetch,
  };
}
