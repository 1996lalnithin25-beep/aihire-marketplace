import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "AIHire — Hire the World's Best AI Talent",
  description:
    "The premier marketplace for AI freelancers, prompt engineers, data labelers, and AI training data collection. Find top AI talent or contribute to cutting-edge datasets.",
  keywords: [
    "AI freelancer",
    "prompt engineering",
    "data labeling",
    "RLHF",
    "AI marketplace",
    "machine learning",
    "training data",
  ],
  openGraph: {
    title: "AIHire — Hire the World's Best AI Talent",
    description: "The premier marketplace for AI freelancers and training data services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
