import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adnan Rafi — Full Stack Developer",
  description:
    "Full-stack developer building AI-powered systems, interactive products, and scalable backend architectures.",
  openGraph: {
    title: "Adnan Rafi Portfolio",
    description: "AI-powered systems, full-stack engineering, real-world products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
