import { getProduct } from "./getProduct";

const mockProductDetail = {
  id: "p1",
  brand: "Brand",
  name: "Product 1",
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
      hexCode: "#000",
      imageUrl: "https://example.com/black.png",
    },
  ],
  storageOptions: [{ capacity: "128 GB", price: 0 }],
  similarProducts: [],
};

function mockFetchOk(body: unknown) {
  return jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(""),
      statusText: "OK",
    } as Response)
  );
}

function mockFetchNotOk(status: number, body = "Error") {
  return jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: status,
      json: () => Promise.reject(new Error("Not JSON")),
      text: () => Promise.resolve(body),
      statusText: "Not Found",
    } as Response)
  );
}

describe("getProduct", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("calls fetch with correct URL and headers including x-api-key", async () => {
    const mock = mockFetchOk(mockProductDetail);
    globalThis.fetch = mock;

    await getProduct("some-id");

    expect(mock).toHaveBeenCalledTimes(1);
    const [url, init] = mock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/products\/some-id$/);
    const headers = init?.headers as Record<string, string>;
    expect(headers).toBeDefined();
    expect(headers["x-api-key"]).toBeDefined();
    expect(headers["Content-Type"]).toBe("application/json");
  });

  it("returns object with colorOptions, storageOptions, similarProducts", async () => {
    const mock = mockFetchOk(mockProductDetail);
    globalThis.fetch = mock;

    const result = await getProduct("some-id");

    expect(result).toMatchObject({
      id: "p1",
      name: "Product 1",
      colorOptions: mockProductDetail.colorOptions,
      storageOptions: mockProductDetail.storageOptions,
      similarProducts: [],
    });
    expect(Array.isArray(result.colorOptions)).toBe(true);
    expect(Array.isArray(result.storageOptions)).toBe(true);
    expect(Array.isArray(result.similarProducts)).toBe(true);
  });

  it("defaults missing colorOptions, storageOptions, similarProducts to []", async () => {
    const raw = {
      ...mockProductDetail,
      colorOptions: undefined,
      storageOptions: undefined,
      similarProducts: undefined,
    };
    const mock = mockFetchOk(raw);
    globalThis.fetch = mock;

    const result = await getProduct("some-id");

    expect(result.colorOptions).toEqual([]);
    expect(result.storageOptions).toEqual([]);
    expect(result.similarProducts).toEqual([]);
  });

  it("throws when response.ok is false", async () => {
    globalThis.fetch = mockFetchNotOk(404, "Not Found");

    await expect(getProduct("x")).rejects.toThrow(
      /Product request failed|404|Not Found/
    );
  });

  it("throws when response JSON is not an object", async () => {
    globalThis.fetch = mockFetchOk(null);

    await expect(getProduct("x")).rejects.toThrow("Invalid product response");
  });

  it("throws when response JSON is a non-object type", async () => {
    globalThis.fetch = mockFetchOk("string");

    await expect(getProduct("x")).rejects.toThrow("Invalid product response");
  });
});
