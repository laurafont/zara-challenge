import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Container } from "@/components/UI/Container";
import { ProductsSection } from "./ProductsSection";
import { Providers } from "@/context/providers";
import * as fetchProductsModule from "../../api/fetchProducts";

const mockProducts = [
  {
    id: "p1",
    brand: "BrandA",
    name: "Phone One",
    basePrice: 999,
    imageUrl: "https://example.com/1.png",
  },
  {
    id: "p2",
    brand: "BrandB",
    name: "Phone Two",
    basePrice: 1299,
    imageUrl: "https://example.com/2.png",
  },
];

jest.mock("../../api/fetchProducts", () => ({
  fetchProducts: jest.fn(),
}));

jest.mock("uuid", () => ({ v4: () => "fixed-id" }));

const fetchProductsMock =
  fetchProductsModule.fetchProducts as jest.MockedFunction<
    typeof fetchProductsModule.fetchProducts
  >;

function renderHome() {
  return render(
    <Providers>
      <Container>
        <ProductsSection />
      </Container>
    </Providers>
  );
}

describe("Home integration", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchProductsMock.mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows product list from API and search updates list", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Phone One")).toBeInTheDocument();
    });
    expect(screen.getByText("Phone Two")).toBeInTheDocument();
    expect(fetchProductsMock).toHaveBeenCalledWith("");

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "phone" } });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(fetchProductsMock).toHaveBeenCalledWith("phone");
    });
  });

  it("product link navigates to detail page", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Phone One")).toBeInTheDocument();
    });

    const productLink = screen.getByRole("link", {
      name: /phone one – branda/i,
    });
    expect(productLink).toHaveAttribute("href", "/product/p1");
  });
});
