import type { Metadata, Viewport } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const noto_Sans_TC = Noto_Sans_TC({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'HOHOJIA',
    description: 'Recipe sharing platform',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={noto_Sans_TC.className}>{children}</body>
        </html>
    )
}
