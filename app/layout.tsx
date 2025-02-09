import QueryProvider from './QueryProvider';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Home Page/Components/Theme-provider";
import { Toaster } from "../@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Marketplace",
  description: "Buy and sell products easily on our marketplace.",
  icons: "https://cdn-icons-png.flaticon.com/512/1137/1137143.png",
  openGraph: {
    title: "Online Marketplace",
    description: "The best place to buy and sell products online.",
    url: "https://sajuu-bazaar.vercel.app", 
    type: "website",
    images: [
      {
        url: "/og-image.webp", // Social media preview image (1200x630 recommended)
        width: 1200,
        height: 630,
        alt: "Online Marketplace Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
