import { fetchProducts } from "@/api/fetchProducts";
import { Container } from "@/components/UI/Container";
import { ProductsList } from "./components/ProductsList";

export default async function Home() {
  const initialProducts = await fetchProducts();

  return (
    <Container>
      <ProductsList initialProducts={initialProducts} />
    </Container>
  );
}
