import type { Metadata } from "next";
import { inter } from "@/fonts/google-fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "MusicGPT",
  description: "AI-powered voice and music generation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
