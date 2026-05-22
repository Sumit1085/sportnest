import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Toaster } from "react-hot-toast";
// import { HeroUIProvider } from "@heroui/react";
import { HeroUIProvider } from "@heroui/react";
import { NextUIProvider } from "@heroui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SportNest - Sports Facility Booking Platform",
  description: "Find and book elite sports turfs, badminton courts, and pools near you.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F4F7]">
        <HeroUIProvider>
          <Header />
          <main className="flex-grow"><NextUIProvider>
            {children}
          </NextUIProvider></main>
          <Toaster position="top-center" reverseOrder={false} />
          <Footer />
        </HeroUIProvider>
      </body>
    </html>
  );
}
