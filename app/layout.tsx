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
  metadataBase: new URL('https://www.shiparezikportfolio.com'),
  title: "Danylo Shypotko — Full-Stack Developer",
  description: "Portfolio of Danylo Shypotko: thoughtful full-stack products with React, Next.js, TypeScript and Node.js.",
  applicationName: "Danylo Shypotko Portfolio",
  keywords: ["Danylo Shypotko", "shiparezik", "Full-Stack Developer", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Danylo Shypotko" }],
  creator: "Danylo Shypotko",
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} antialiased`}>
      <body className="bg-[#0a0a0f] text-white">{children}</body>
    </html>
  );
}
