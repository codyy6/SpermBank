import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sol-spermbank: Next-Gen Fertility Solutions",
  description: "Revolutionizing fertility with blockchain technology on Solana",
  openGraph: {
    title: 'Sol-spermbank: Next-Gen Fertility Solutions',
    description: 'Revolutionizing fertility with blockchain technology on Solana',
    url: 'https://sol-spermbank.vercel.app',
    siteName: 'Sol-spermbank',
    images: '/banner.png',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </Providers>
    </html>
  );
}
