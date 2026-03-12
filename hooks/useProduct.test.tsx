import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useProduct } from "./useProduct";
import * as getProductModule from "../api/getProduct";

const mockProduct = {
  id: "id-1",
  brand: "Brand",
  name: "Product 1",
  description: "Desc",
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
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
};

jest.mock("../api/getProduct", () => ({
  getProduct: jest.fn(),
}));

const getProductMock = getProductModule.getProduct as jest.MockedFunction<
  typeof getProductModule.getProduct
>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useProduct", () => {
  beforeEach(() => {
    getProductMock.mockClear();
    getProductMock.mockResolvedValue(mockProduct);
  });

  it("returns product and calls getProduct with id", async () => {
    const { result } = renderHook(
      () => useProduct("id-1", { initialData: null }),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
    expect(getProductMock).toHaveBeenCalledWith("id-1");
  });

  it("returns null and does not fetch when id is empty", () => {
    const { result } = renderHook(() => useProduct(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.product).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(getProductMock).not.toHaveBeenCalled();
  });

  it("uses initialData when provided", async () => {
    const { result } = renderHook(
      () => useProduct("id-1", { initialData: mockProduct }),
      { wrapper: createWrapper() }
    );

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.loading).toBe(false);
    await waitFor(() => {
      expect(getProductMock).toHaveBeenCalledWith("id-1");
    });
  });

  it("returns error when getProduct throws", async () => {
    getProductMock.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useProduct("id-1"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
    expect(result.current.product).toBeNull();
    expect(result.current.error?.message).toContain("Network error");
  });
});
