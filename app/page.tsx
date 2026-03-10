import { fetchProducts } from "@/api/fetchProducts";
import { ProductsList } from "./components/ProductsList";

export default async function Home() {
  const initialProducts = await fetchProducts();

  return (
    <main>
      <ProductsList initialProducts={initialProducts} />
    </main>
  );
}
