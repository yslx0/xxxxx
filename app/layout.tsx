import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nosso Amor ❤️ - Contador de Tempo Juntos",
  description: "Um site especial para celebrar nosso amor com contador de tempo, playlist romântica e muito carinho",
  keywords: "amor, relacionamento, contador, música, romance",
  authors: [{ name: "Casal Apaixonado" }],
  openGraph: {
    title: "Nosso Amor ❤️",
    description: "Celebrando nosso tempo juntos com muito amor",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
