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
  description: "Ethan's portfolio website ",
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
