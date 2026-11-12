import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Harsh Singh – Cloud, DevOps & Data Center Operations",
  description:
    "Portfolio of Harsh Singh, a Mumbai-based engineer running data center operations, a production Proxmox private cloud, storage, backup and AWS automation.",
  openGraph: {
    title: "Harsh Singh – Cloud, DevOps & Data Center Operations",
    description: "Data center operations, Proxmox private cloud, storage, backup and AWS automation.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%23050816'/><rect x='8' y='8' width='16' height='4' rx='1' fill='%2300D9FF'/><rect x='8' y='14' width='16' height='4' rx='1' fill='%237D5FFF'/><rect x='8' y='20' width='16' height='4' rx='1' fill='%2300FFAA'/></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-void font-sans text-white antialiased">{children}</body>
    </html>
  );
}
