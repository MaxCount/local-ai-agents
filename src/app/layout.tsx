import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "LINUCHI — Чехлы, сумки, портпледы",
  description: "Частное производственное унитарное предприятие ЛИНУЧИ — единственное специализированное предприятие в Республике Беларусь по производству чехлов (футляров).",
  keywords: "чехлы, сумки, портпледы, Беларусь, Борисов, чехлы для одежды, чехлы для ноутбуков",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
