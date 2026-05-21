import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayFound - indie game discovery platform",
  description:
    "PlayFound helps Russian-speaking indie developers find first players, feedback, wishlists and attention."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07100b"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="darkGreen" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <div className="min-h-screen">
            <Header />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
