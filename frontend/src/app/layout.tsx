import type { Metadata } from "next";
import { inter } from "@/fonts/google-fonts";
import "./globals.css";
import { ReactQueryProvider } from "@/utils/react-query-provider";
import { ToastProvider } from "@/components/common/toast-provider";
import { GradientBackground } from "@/components/gradient-background";

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
      <body className="font-sans antialiased">
        <ReactQueryProvider>
          <GradientBackground />
          {children}
          <ToastProvider />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
