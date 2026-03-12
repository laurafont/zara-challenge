import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders search input and 0 results text", () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} resultCount={0} />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByText("0 results")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} resultCount={0} />);
    const input = screen.getByLabelText("Search");
    fireEvent.change(input, { target: { value: "phone" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ type: "change" })
    );
  });

  it("renders singular result when resultCount is 1", () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} resultCount={1} />);
    expect(screen.getByText("1 result")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const onChange = jest.fn();
    const { container } = render(
      <SearchBar value="" onChange={onChange} resultCount={0} />
    );
    const results = await axe(container, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
