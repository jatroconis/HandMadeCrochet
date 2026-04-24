import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Hand Made Crochet",
    template: "%s | Hand Made Crochet",
  },
  description:
    "Piezas de crochet hechas a mano con una estética beige + oscura, editorial y premium. Descubrí el universo de Hand Made Crochet.",
  openGraph: {
    title: "Hand Made Crochet",
    description:
      "Colección handmade premium con piezas de crochet, detalles artesanales y una presencia visual cálida, elegante y cinematográfica.",
    images: [
      {
        url: "https://images.pixieset.com/399522311/9870afd4b6303432d845445fd0a37683-cover-large.jpg",
        width: 1600,
        height: 1067,
        alt: "Portada de la colección de Hand Made Crochet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hand Made Crochet",
    description:
      "Crochet handmade con una dirección visual moderna, artesanal y sofisticada en tonos beige + oscuro.",
    images: [
      "https://images.pixieset.com/399522311/9870afd4b6303432d845445fd0a37683-cover-large.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
