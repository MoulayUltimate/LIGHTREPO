import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lightburn Pro – Better Software For Laser Cutters",
  description:
    "Transform your laser cutting workflow with LightBurn Pro. One-time payment, instant delivery, trusted by 50,000+ professionals. Save 72% today!",
  generator: "v0.app",
  keywords: ["lightburn", "laser engraving", "laser cutting", "software", "CNC"],
  icons: {
    icon: "/logo-icon.webp",
    apple: "/logo-icon.webp",
  },
}

export const viewport: Viewport = {
  themeColor: "#8B1A1A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
