import { Provider } from "@/components/ui/provider";
import { PawEffectProvider } from "@/components/providers/PawEffectProvider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "感謝のメッセージアプリ",
  description: "大切な人に感謝の気持ちを伝えるアプリケーション",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E6" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* Preload key images for faster first and subsequent views */}
        <link rel="preload" as="image" href="/manaby-jump2.webp" />
        <link rel="preload" as="image" href="/sakuda.webp" />
        <link rel="preload" as="image" href="/saito.webp" />
        <link rel="preload" as="image" href="/manabyicon.webp" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <Provider>
          <PawEffectProvider>
            {children}
          </PawEffectProvider>
        </Provider>
      </body>
    </html>
  );
}
