import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Cart } from "../../components/Cart/Cart";
import { Providers } from "../../context/providers";
import * as cartStorageModule from "../../context/cartStorage";

const mockCartItem = {
  id: "cart-1",
  productId: "p1",
  brand: "Brand",
  name: "Product One",
  color: "Black",
  storage: "128 GB",
  imageUrl: "https://example.com/img.png",
  unitPrice: 999,
};

jest.mock("../../context/cartStorage", () => ({
  getStoredCart: jest.fn(() => []),
  setStoredCart: jest.fn(),
}));

jest.mock("uuid", () => ({ v4: () => "fixed-id" }));

const getStoredCartMock =
  cartStorageModule.getStoredCart as jest.MockedFunction<
    typeof cartStorageModule.getStoredCart
  >;

function renderCartWithInitialItem() {
  getStoredCartMock.mockReturnValue([mockCartItem]);
  return render(
    <Providers>
      <Cart />
    </Providers>
  );
}

describe("Cart integration", () => {
  beforeEach(() => {
    getStoredCartMock.mockReturnValue([mockCartItem]);
  });

  it("remove item updates list and total; Continue Shopping links to home", async () => {
    renderCartWithInitialItem();

    expect(
      screen.getByRole("heading", { name: /CART \(1\)/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    const removeButton = screen.getByRole("button", {
      name: "Eliminar Product One",
    });
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /CART \(0\)/i })
      ).toBeInTheDocument();
    });
    expect(screen.queryByText("Product One")).not.toBeInTheDocument();
    expect(screen.queryByText("Total")).not.toBeInTheDocument();

    const continueLink = screen.getByRole("link", {
      name: /continue shopping/i,
    });
    expect(continueLink).toHaveAttribute("href", "/");
  });
});
