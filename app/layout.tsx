import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayFound — инди-игры, демо и релизы",
  description:
  other: {
    telderi: "a15d6073c7c8865893d2f081337b7208",
  },
};
    "PlayFound — игровая платформа для поиска, сохранения, обсуждения и покупки инди-игр.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg"
  },
  manifest: "/site.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07130c"
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
