import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "AppliedAI-Lab",
    template: "%s | AppliedAI-Lab",
  },
  description:
    "AppliedAI-Lab applies state-of-the-art AI to high-impact scientific domains — advancing molecular discovery in bioinformatics, building foundation models for time series, and accelerating functional material design.",
  keywords: [
    "AI research",
    "bioinformatics",
    "molecular design",
    "drug discovery",
    "time series",
    "foundation models",
    "materials science",
    "generative AI",
    "deep learning",
    "applied AI",
    "research lab",
  ],
  authors: [{ name: "AppliedAI-Lab" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AppliedAI-Lab",
    title: "AppliedAI-Lab — AI for Bioinformatics, Time Series & Materials",
    description: "Applying state-of-the-art AI to bioinformatics, time series analysis, and materials design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppliedAI-Lab — AI for Bioinformatics, Time Series & Materials",
    description: "Applying state-of-the-art AI to bioinformatics, time series analysis, and materials design.",
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
    <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
