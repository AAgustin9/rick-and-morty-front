import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rick Wiki',
  description: 'Rick and Morty character searcher',
  generator: 'developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className='dark'>
      <body>{children}</body>
    </html>
  )
}
