import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Equine Precision Performance",
    template: "%s | Precision Performance",
  },
  description: "Equine biochemistry and recovery intelligence supporting informed trainer decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
