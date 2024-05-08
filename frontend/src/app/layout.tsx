import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const noto_Sans_TC = Noto_Sans_TC({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'HOHOJIA',
    description: 'Recipe sharing platform',
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
