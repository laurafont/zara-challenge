import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useProductList } from "./useProductList";
import * as fetchProductsModule from "../api/fetchProducts";

const mockProducts = [
  {
    id: "p1",
    brand: "Brand",
    name: "Product 1",
    basePrice: 999,
    imageUrl: "https://example.com/1.png",
  },
];

jest.mock("../api/fetchProducts", () => ({
  fetchProducts: jest.fn(),
}));

const fetchProductsMock =
  fetchProductsModule.fetchProducts as jest.MockedFunction<
    typeof fetchProductsModule.fetchProducts
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

describe("useProductList", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchProductsMock.mockClear();
    fetchProductsMock.mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns products, search, setSearch, loading, error, totalCount", async () => {
    const { result } = renderHook(() => useProductList(), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.search).toBe("");
    expect(result.current.totalCount).toBe(0);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.totalCount).toBe(1);
    expect(result.current.error).toBeNull();
    expect(fetchProductsMock).toHaveBeenCalledWith("");
  });

  it("search and setSearch work; after debounce fetchProducts called with query", async () => {
    const { result } = renderHook(() => useProductList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    fetchProductsMock.mockClear();

    act(() => {
      result.current.setSearch("phone");
    });
    expect(result.current.search).toBe("phone");
    expect(fetchProductsMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    await waitFor(() => {
      expect(fetchProductsMock).toHaveBeenCalledWith("phone");
    });
  });

  it("uses initialProducts when provided and debounced query is empty", async () => {
    const initial = [
      {
        id: "init",
        brand: "B",
        name: "Initial",
        basePrice: 100,
        imageUrl: "https://example.com/init.png",
      },
    ];
    fetchProductsMock.mockResolvedValue(initial);
    const { result } = renderHook(() => useProductList(initial), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.products).toEqual(initial);
    expect(result.current.totalCount).toBe(1);
    expect(fetchProductsMock).toHaveBeenCalledWith("");
  });

  it("returns error when fetchProducts throws", async () => {
    fetchProductsMock.mockRejectedValueOnce(new Error("Fetch failed"));

    const { result } = renderHook(() => useProductList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
    expect(result.current.error?.message).toContain("Fetch failed");
    expect(result.current.products).toEqual([]);
  });
});
