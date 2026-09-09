import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Belial Digital — Dark Devotion, Printed to Order",
  description:
    "Gothic apparel print-on-demand store. Stripe checkout, Printful fulfillment, studio-made cloaks and jewelry.",
};

export const viewport: Viewport = {
  themeColor: "#07060a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
