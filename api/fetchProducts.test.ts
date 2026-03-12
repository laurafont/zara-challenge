import { fetchProducts } from "./fetchProducts";

const mockProduct = {
  id: "p1",
  brand: "Brand",
  name: "Product 1",
  basePrice: 999,
  imageUrl: "https://example.com/img.png",
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

describe("fetchProducts", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("calls fetch with correct URL and headers including x-api-key", async () => {
    const mock = mockFetchOk([mockProduct]);
    globalThis.fetch = mock;

    await fetchProducts();

    expect(mock).toHaveBeenCalledTimes(1);
    const [url, init] = mock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/products$/);
    const headers = init?.headers as Record<string, string>;
    expect(headers).toBeDefined();
    expect(headers["x-api-key"]).toBeDefined();
    expect(headers["Content-Type"]).toBe("application/json");
  });

  it("calls fetch with search query in URL when query is provided", async () => {
    const mock = mockFetchOk([mockProduct]);
    globalThis.fetch = mock;

    await fetchProducts("  phone  ");

    expect(mock).toHaveBeenCalledTimes(1);
    const [url] = mock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/products\?search=phone/);
  });

  it("returns typed array and first item has id, name, basePrice", async () => {
    const mock = mockFetchOk([mockProduct]);
    globalThis.fetch = mock;

    const result = await fetchProducts();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: "p1",
      name: "Product 1",
      basePrice: 999,
      brand: "Brand",
      imageUrl: "https://example.com/img.png",
    });
  });

  it("throws when response.ok is false", async () => {
    globalThis.fetch = mockFetchNotOk(404, "Not Found");

    await expect(fetchProducts()).rejects.toThrow(
      /Products request failed|404|Not Found/
    );
  });

  it("throws when response JSON is not an array", async () => {
    globalThis.fetch = mockFetchOk({ not: "an array" });

    await expect(fetchProducts()).rejects.toThrow("Invalid products response");
  });
});
