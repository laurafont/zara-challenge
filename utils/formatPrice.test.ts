import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats zero as 0 EUR", () => {
    expect(formatPrice(0)).toBe("0 EUR");
  });

  it("formats a positive integer", () => {
    expect(formatPrice(3000)).toBe("3000 EUR");
  });

  it("formats a large number", () => {
    expect(formatPrice(1_234_567)).toBe("1234567 EUR");
  });

  it("rounds decimals to nearest integer", () => {
    expect(formatPrice(99.4)).toBe("99 EUR");
    expect(formatPrice(99.6)).toBe("100 EUR");
  });
});
