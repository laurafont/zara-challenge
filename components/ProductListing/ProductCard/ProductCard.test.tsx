import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ProductCard } from "./ProductCard";

const mockProduct = {
  id: "123",
  brand: "Brand",
  name: "Product Name",
  basePrice: 3000,
  imageUrl: "https://example.com/img.png",
};

describe("ProductCard", () => {
  it("renders name, brand, and formatted price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Product Name")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("3.000 EUR")).toBeInTheDocument();
  });

  it("renders a link with href to product path", () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link", { name: /product name – brand/i });
    expect(link).toHaveAttribute("href", "/product/123");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    const results = await axe(container, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
