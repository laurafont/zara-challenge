import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/getProduct";

//Fetches a single product by id
export function useProduct(id: string) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
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
