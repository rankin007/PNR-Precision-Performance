import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://precisionperformance.com.au"),
  title: {
    default: "Equine Precision Performance",
    template: "%s | Precision Performance",
  },
  description: "Equine biochemistry and recovery intelligence supporting informed trainer decisions.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
