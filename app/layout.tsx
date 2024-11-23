import { Providers } from "./providers";
import DrawerLayout from "./Components/DrawerLayout";
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

// Initialize the Quicksand font
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'My Next.js 14 App',
  description: 'Created with Next.js 14 and Quicksand font',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>
          <DrawerLayout>
          {children}
          </DrawerLayout>
        </Providers>
      </body>
    </html>
  );
}
