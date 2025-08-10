import { Provider } from "@/components/ui/provider";
import { PawEffectProvider } from "@/components/providers/PawEffectProvider";
import type { Metadata } from "next";
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
  themeColor: "#F5F0E6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
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
