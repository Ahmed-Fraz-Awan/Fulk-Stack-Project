import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Student Digital Twin AI",
    template: "%s · Student Digital Twin AI",
  },
  description:
    "An AI-powered digital twin that learns your study patterns and predicts performance, burnout and focus — in real time.",
  metadataBase: new URL("https://student-digital-twin.ai"),
  openGraph: {
    title: "Student Digital Twin AI",
    description:
      "Predict academic performance, burnout & focus with an AI twin built for students.",
    url: "https://student-digital-twin.ai",
    siteName: "Student Digital Twin AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Digital Twin AI",
    description:
      "Predict academic performance, burnout & focus with an AI twin built for students.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a18" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${space.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
