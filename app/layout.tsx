import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "PNR Precision Performance",
  description: "Racehorse-focused equine platform for data capture, member access, and operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
