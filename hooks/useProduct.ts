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
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
    initialData: initialData ?? undefined,
  });

  if (!id) {
    return { product: null, loading: false, error: null };
  }

  return {
    product: product ?? null,
    loading: isLoading,
    error: error ?? null,
  };
}
