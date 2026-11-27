import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AsciiArt } from "@/components/ascii-art";
import { KeyHandler } from "@/components/key-handler";
import { StatusLine } from "@/components/status-line";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed",
  description: "Software engineer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex h-screen flex-col select-none">
        <KeyHandler />

        <div className="flex flex-1 flex-col items-center overflow-auto pt-16">
          <AsciiArt />
          {children}
        </div>

        <StatusLine />
      </body>
    </html>
  );
}
