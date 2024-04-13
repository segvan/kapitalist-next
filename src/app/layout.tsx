import "./globals.css";
import "bulma/css/bulma.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Kapitalist",
  description: "Kapitalist web site",
};

export default function RootLayout({children,}: { children: React.ReactNode; }) {
  return (
    <html lang="en">
    <head>
      <title>Kapitalist</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="manifest" href="manifest.json"/>
    </head>
    <body className={inter.className}>
    <Navbar/>
    <section className="section py-4 px-2">
      {children}
    </section>
    <Footer/>
    </body>
    </html>
  );
}
