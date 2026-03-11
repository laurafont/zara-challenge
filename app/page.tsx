import { fetchProducts } from "@/api/fetchProducts";
import { Container } from "@/components/UI/Container";
import { ProductsSection } from "@/components/ProductsSection";

export default async function Home() {
  const initialProducts = await fetchProducts();

  return (
    <Container>
      <ProductsSection initialProducts={initialProducts} />
    </Container>
  );
}
