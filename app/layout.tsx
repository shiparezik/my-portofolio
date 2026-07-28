import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "shiparezik | portfolio",
  description: "17 y.o. Full Stack Developer from Poland. React, Next.js, C#, Python.",
  icons: { icon: "/icon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} antialiased`}>
      <body className="bg-[#0a0a0f] text-white">{children}</body>
    </html>
  );
}
