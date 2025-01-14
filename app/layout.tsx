import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import BackgroundRays from "@/components/BackgroundRays";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Taimoor",
  description: "Building products that matter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BackgroundRays />
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}