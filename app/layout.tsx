import type { Metadata } from "next";
import "./globals.scss";
import { Providers } from "@/context/providers";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Zara",
  description: "Shop the latest products",
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
