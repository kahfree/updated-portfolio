import type { Metadata } from "next";
import { Geist, Geist_Mono, Tinos, Host_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tinosSans = Tinos({
  weight: "700"
})

const hostGrotesk = Host_Grotesk({

})

export const metadata: Metadata = {
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
      <head>
        <link rel="stylesheet" href="./styles.css"></link>
      </head>
      <body
        className={`${hostGrotesk.className}`}
      >
        {children}
      </body>
    </html>
  );
}
