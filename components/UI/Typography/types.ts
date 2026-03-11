import { ReactNode, ElementType } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5";

export type TextVariant = "body" | "bodySmall" | "caption" | "overline";

export type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
};

export type HeadingProps = BaseTypographyProps & {
  level?: HeadingLevel;
};

export type TextProps = BaseTypographyProps & {
  variant?: TextVariant;
  as?: ElementType;
};
