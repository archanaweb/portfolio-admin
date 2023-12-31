'use client';
import Sidebar from './components/sidebar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen`}>
        <Sidebar />
        <div className="grow flex">
        {children}
        </div>
      </body>
    </html>
  )
}
