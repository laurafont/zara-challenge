import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CartItems } from "./CartItems";
import * as CartContextModule from "../../context/CartContext";

const mockCartItem = {
  id: "cart-item-1",
  productId: "p1",
  brand: "Brand",
  name: "Product One",
  color: "Black",
  storage: "128 GB",
  imageUrl: "https://example.com/img.png",
  unitPrice: 999,
};

const mockRemoveItem = jest.fn();

jest.mock("../../context/CartContext", () => ({
  useCart: jest.fn(),
}));

const useCartMock = CartContextModule.useCart as jest.MockedFunction<
  typeof CartContextModule.useCart
>;

describe("CartItems", () => {
  beforeEach(() => {
    useCartMock.mockReturnValue({
      cart: [mockCartItem],
      addItem: jest.fn(),
      removeItem: mockRemoveItem,
    });
    mockRemoveItem.mockClear();
  });

  it("renders one row with name, color, storage and remove button", () => {
    render(<CartItems />);
    expect(
      screen.getByRole("listitem", {
        name: "Product One, Black, 128 GB",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Eliminar Product One" })
    ).toBeInTheDocument();
  });

  it("calls removeItem with item id when Eliminar is clicked", () => {
    render(<CartItems />);
    const removeButton = screen.getByRole("button", {
      name: "Eliminar Product One",
    });
    fireEvent.click(removeButton);
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith({ id: mockCartItem.id });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CartItems />);
    const results = await axe(container, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
