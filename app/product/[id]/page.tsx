import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/api/getProduct";
import { fetchProducts } from "@/api/fetchProducts";
import { ProductItem } from "@/components/ProductDetail/ProductItem/ProductItem";
import { formatPrice } from "@/utils/formatPrice";

// Implement ISR
export const revalidate = 3600;

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    const title = `${product.brand} ${product.name}`;
    const price = formatPrice(product.basePrice);
    const description = `${product.description} — ${price}`;
    const image = product.colorOptions[0]?.imageUrl;

    return {
      title,
      description,
      openGraph: {
        type: "website",
        title,
        description,
        ...(image && { images: [{ url: image, alt: title }] }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  if (!id) notFound();

  let initialProduct = null;
  try {
    initialProduct = await getProduct(id);
  } catch {
    notFound();
  }

  return <ProductItem productId={id} initialProduct={initialProduct} />;
}
