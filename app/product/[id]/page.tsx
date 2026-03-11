import { notFound } from "next/navigation";
import { getProduct } from "@/api/getProduct";
import { ProductItem } from "@/components/ProductItem/ProductItem";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  if (!id) notFound();

  let product = null;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return <ProductItem productId={id} initialProduct={product} />;
}
