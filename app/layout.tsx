import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import AuthGuard from "./components/AuthGuard"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS App",
  description: "Application sécurisée avec Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" data-theme="fantasy">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AuthGuard>{children}</AuthGuard> {/* ✅ Utilisation du composant client */}
        </body>
      </html>
    </AuthProvider>
  );
}
