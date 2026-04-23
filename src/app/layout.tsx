import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adnan Rafi | Full Stack Developer",
  description: "Portfolio of Adnan Rafi - Full Stack Developer specializing in Next.js, AI/ML, and scalable web applications.",
  keywords: ["portfolio", "developer", "next.js", "full-stack", "ai", "ml"],
  authors: [{ name: "Adnan Rafi" }],
  openGraph: {
    title: "Adnan Rafi | Full Stack Developer",
    description: "Portfolio of Adnan Rafi - Full Stack Developer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
