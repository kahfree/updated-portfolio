import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({})

export const metadata: Metadata = {
  metadataBase: new URL("https://caffrey.dev"),
  title: "caffrey.dev",
  description: "Ethan's portfolio website",
  openGraph: {
    title: "caffrey.dev",
    description: "Ethan's portfolio website",
    url: "https://caffrey.dev",
    type: "website",
    images: [
      {
        url: "/favicon.ico",
        width: 256,
        height: 256,
        alt: "Portfolio Favicon",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "caffrey.dev",
    description: "Ethan's portfolio website",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hostGrotesk.className}>
        {children}
      </body>
    </html>
  );
}
