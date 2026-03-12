import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import * as uuidModule from "uuid";
import { CartProvider, useCart } from "./CartContext";
import * as cartStorageModule from "./cartStorage";

const mockItem = {
  productId: "p1",
  brand: "Brand",
  name: "Product 1",
  color: "Black",
  storage: "128 GB",
  imageUrl: "https://example.com/img.png",
  unitPrice: 999,
};

jest.mock("./cartStorage", () => ({
  getStoredCart: jest.fn(() => []),
  setStoredCart: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "fixed-id"),
}));

const getStoredCartMock =
  cartStorageModule.getStoredCart as jest.MockedFunction<
    typeof cartStorageModule.getStoredCart
  >;
const setStoredCartMock =
  cartStorageModule.setStoredCart as jest.MockedFunction<
    typeof cartStorageModule.setStoredCart
  >;

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
  };
}

describe("CartContext", () => {
  beforeEach(() => {
    getStoredCartMock.mockReturnValue([]);
    setStoredCartMock.mockClear();
    (uuidModule.v4 as jest.Mock<string>).mockReturnValue("fixed-id");
  });

  describe("addItem / removeItem", () => {
    it("adds item with fixed id, then removeItem by id leaves cart empty", () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: createWrapper(),
      });

      expect(result.current.cart).toHaveLength(0);

      act(() => {
        result.current.addItem(mockItem);
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0]).toMatchObject({
        id: "fixed-id",
        ...mockItem,
      });

      act(() => {
        result.current.removeItem({ id: "fixed-id" });
      });

      expect(result.current.cart).toHaveLength(0);
    });

    it("removeItem by id: add two items, remove first by id, remaining is second", () => {
      (uuidModule.v4 as jest.Mock<string>)
        .mockReturnValueOnce("id-1")
        .mockReturnValueOnce("id-2");

      const { result } = renderHook(() => useCart(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.addItem(mockItem);
      });
      act(() => {
        result.current.addItem({
          ...mockItem,
          productId: "p2",
          name: "Product 2",
        });
      });

      expect(result.current.cart).toHaveLength(2);

      act(() => {
        result.current.removeItem({ id: "id-1" });
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].id).toBe("id-2");
      expect(result.current.cart[0].name).toBe("Product 2");
    });
  });

  describe("Persistence", () => {
    it("calls setStoredCart with cart after add and after remove", async () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.addItem(mockItem);
      });

      await waitFor(() => {
        expect(setStoredCartMock).toHaveBeenCalled();
      });
      const afterAdd =
        setStoredCartMock.mock.calls[
          setStoredCartMock.mock.calls.length - 1
        ]?.[0];
      expect(afterAdd).toHaveLength(1);
      expect(afterAdd?.[0]).toMatchObject({ id: "fixed-id", ...mockItem });

      act(() => {
        result.current.removeItem({ id: "fixed-id" });
      });

      expect(setStoredCartMock).toHaveBeenLastCalledWith([]);
    });
  });
});
