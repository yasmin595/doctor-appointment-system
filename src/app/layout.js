// "use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/Shared/NavBar/NavBar";
import Footer from "@/components/Shared/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";



import NextAuthProvider from "@/providers/NextAuthProvider";
import Navbar from "@/components/Shared/NavBar/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Toast */}
            <Toaster richColors />
            {/* Footer */}
            <Footer />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

