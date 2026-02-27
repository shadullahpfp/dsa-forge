import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSA FORGE - Think. Build. Master DSA.",
  description: "A production-grade DSA learning platform. Learn Data Structures and Algorithms from zero to advanced with interactive lessons, code execution, and personalized learning paths.",
  keywords: ["DSA", "Data Structures", "Algorithms", "Coding", "Programming", "Learning", "Interview Prep", "LeetCode Alternative"],
  authors: [{ name: "DSA FORGE Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "DSA FORGE - Think. Build. Master DSA.",
    description: "Master Data Structures and Algorithms with structured learning paths, interactive code editor, and personalized progress tracking.",
    url: "https://dsaforge.dev",
    siteName: "DSA FORGE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSA FORGE - Think. Build. Master DSA.",
    description: "Master Data Structures and Algorithms with structured learning paths",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
