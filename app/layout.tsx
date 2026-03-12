import type { Metadata } from "next";
import "./globals.scss";
import { Providers } from "@/context/providers";
import { Header } from "@/components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zara.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zara – Shop the latest products",
    template: "%s | Zara",
  },
  description:
    "Discover the latest products. Browse our collection and find the best deals on phones, electronics and more.",
  keywords: [
    "shop",
    "ecommerce",
    "products",
    "electronics",
    "phones",
    "online store",
    "Zara",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en",
    siteName: "Zara",
    title: "Zara – Shop the latest products",
    description:
      "Discover the latest products. Browse our collection and find the best deals.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zara – Shop the latest products",
    description: "Discover the latest products. Browse our collection.",
  },
  category: "shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
