import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { CartIcon } from "../../components/CartIcon";
import { Providers } from "../../context/providers";
import { ROUTES } from "../../constants";

const mockProductDetail = {
  id: "p1",
  brand: "Brand",
  name: "Product One",
  description: "A product",
  basePrice: 999,
  specs: {
    screen: "6.1",
    resolution: "1170x2532",
    processor: "A15",
    mainCamera: "12 MP",
    selfieCamera: "12 MP",
    battery: "3095 mAh",
    os: "iOS 15",
    screenRefreshRate: "60 Hz",
  },
  colorOptions: [
    {
      name: "Black",
      hexCode: "#000000",
      imageUrl: "https://example.com/black.png",
    },
    {
      name: "White",
      hexCode: "#ffffff",
      imageUrl: "https://example.com/white.png",
    },
  ],
  storageOptions: [
    { capacity: "128 GB", price: 0 },
    { capacity: "256 GB", price: 100 },
  ],
  similarProducts: [],
};

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  notFound: () => null,
}));

jest.mock("uuid", () => ({ v4: () => "fixed-id" }));

function renderProductPage() {
  return render(
    <Providers>
      <ProductItem productId="p1" initialProduct={mockProductDetail} />
      <CartIcon />
    </Providers>
  );
}

describe("Product page integration", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("selecting color and storage enables add button; add to cart updates count", async () => {
    renderProductPage();

    expect(screen.getByRole("button", { name: "Añadir" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "128 GB" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Black" }));

    const addButton = screen.getByRole("button", { name: "Añadir" });
    expect(addButton).not.toBeDisabled();

    fireEvent.click(addButton);

    expect(mockPush).toHaveBeenCalledWith(ROUTES.CART);
    await waitFor(() => {
      expect(screen.getByLabelText("1 items in cart")).toBeInTheDocument();
    });
  });
});
