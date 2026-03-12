import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import React from "react";

// next/image: render as plain img so tests can assert without Next runtime
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props: {
    src?: string;
    alt?: string;
    [key: string]: unknown;
  }) {
    const { src, alt, fill, priority, ...rest } = props;
    void fill;
    void priority;
    return React.createElement("img", { src, alt, ...rest });
  },
}));

// next/link: render as <a> with href so RTL can assert links
jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockLink(props: {
    href: string;
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) {
    const { href, children, className, ...rest } = props;
    return React.createElement("a", { href, className, ...rest }, children);
  },
}));
