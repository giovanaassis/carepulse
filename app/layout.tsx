import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare management system",
  keywords: [
    "medical appointment scheduling",
    "book medical appointment online",
    "schedule doctor appointment",
    "online doctor booking",
    "medical appointment booking system",
    "healthcare appointment platform",
    "clinic appointment scheduling",
  ],
  openGraph: {
    title: "Carepulse",
    description:
      "A healthcare management system. Schedule your doctor appointment easily.",
    type: "website",
    url: "https://carepulse-orpin.vercel.app",
    images: [
      {
        url: "https://carepulse-orpin.vercel.app/assets/images/project-print-homepage.png",
      },
    ],
  },
  alternates: {
    canonical: "https://carepulse-orpin.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
