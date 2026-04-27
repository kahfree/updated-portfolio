import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({})

export const metadata: Metadata = {
  metadataBase: new URL("https://caffrey.dev"),
  title: "Ethan Caffrey | Fullstack Engineer",
  description: "Ethan Caffrey — fullstack engineer building fast, polished web products with React, Spring Boot, and more.",
  openGraph: {
    title: "Ethan Caffrey | Fullstack Engineer",
    description: "Ethan Caffrey — fullstack engineer building fast, polished web products with React, Spring Boot, and more.",
    url: "https://caffrey.dev",
    type: "website",
    siteName: "Ethan Caffrey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Caffrey | Fullstack Engineer",
    description: "Ethan Caffrey — fullstack engineer building fast, polished web products with React, Spring Boot, and more.",
  },
  alternates: {
    canonical: "https://caffrey.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ethan Caffrey",
  url: "https://caffrey.dev",
  email: "ethancaff@gmail.com",
  sameAs: ["https://github.com/kahfree"],
  jobTitle: "Fullstack Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hostGrotesk.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
