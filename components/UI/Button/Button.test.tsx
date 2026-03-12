import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a disabled button when disabled is true", () => {
    render(<Button disabled>Label</Button>);
    const button = screen.getByRole("button", { name: "Label" });
    expect(button).toBeDisabled();
  });

  it("renders an enabled button when disabled is false or omitted", () => {
    render(<Button>Label</Button>);
    const button = screen.getByRole("button", { name: "Label" });
    expect(button).not.toBeDisabled();
  });

  it("renders a link when href is provided and has no disabled prop", () => {
    render(<Button href="/cart">Go to cart</Button>);
    const link = screen.getByRole("link", { name: "Go to cart" });
    expect(link).toHaveAttribute("href", "/cart");
    expect(link).not.toHaveAttribute("disabled");
  });

  it("has no accessibility violations as button", async () => {
    const { container } = render(<Button>Label</Button>);
    const results = await axe(container, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations as link", async () => {
    const { container } = render(<Button href="/cart">Go to cart</Button>);
    const results = await axe(container, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
