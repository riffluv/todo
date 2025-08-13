import { PawEffectProvider } from "@/components/providers/PawEffectProvider";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "manaby-todo",
  description: "大切なタスクを管理するTodoアプリケーション",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <link rel="preload" as="image" href="/manabyicon.webp" />
        <link rel="preload" as="image" href="/manabylogo.webp" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} antialiased`}>
        <Provider>
          <PawEffectProvider>
            {children}
            <Toaster />
          </PawEffectProvider>
        </Provider>
      </body>
    </html>
  );
}
