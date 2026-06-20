import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trace | Precision Tracking for Climate Action",
  description: "Beyond silence, we build the eternal. Track, understand, and reduce your carbon footprint.",
};

import { Header } from "@/components/ui/header-1";
import { RadialGlowBackground } from "@/components/ui/radial-glow-background";
import { Footer } from "@/components/ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <RadialGlowBackground>
          <Header />
          <div className="flex-1 flex flex-col min-h-screen">
            {children}
          </div>
          <Footer />
        </RadialGlowBackground>
      </body>
    </html>
  );
}
