import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "tomato.tools — Personal tool portal",
  description:
    "tomato が個人で作ったツール（Meeting Transcriber / WhisperWin / keyprobe）をまとめたポータル。",
  metadataBase: new URL("https://tomato-tools.vercel.app"),
  openGraph: {
    title: "tomato.tools",
    description:
      "tomato が個人で作ったツール（Meeting Transcriber / WhisperWin / keyprobe）をまとめたポータル。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`dark ${inter.variable} ${notoSansJP.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-dvh font-sans"
        style={{
          fontFamily:
            "var(--font-inter), var(--font-noto-jp), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
