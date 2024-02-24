import "./globals.css";
import "bulma/css/bulma.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kapitalist",
  description: "Kapitalist web site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link rel="manifest" href="manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
