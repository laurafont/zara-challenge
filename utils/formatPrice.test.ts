import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats zero as 0 EUR", () => {
    expect(formatPrice(0)).toBe("0 EUR");
  });

  it("formats a positive integer with default locale (de-DE)", () => {
    expect(formatPrice(3000)).toBe("3.000 EUR");
  });

  it("formats a large number with default locale", () => {
    expect(formatPrice(1_234_567)).toBe("1.234.567 EUR");
  });

  it("uses custom locale (en-US) and formats differently", () => {
    expect(formatPrice(3000, "en-US")).toBe("3,000 EUR");
  });

  it("rounds to integer when given a decimal (maximumFractionDigits: 0)", () => {
    expect(formatPrice(99.4)).toBe("99 EUR");
    expect(formatPrice(99.6)).toBe("100 EUR");
  });
});
