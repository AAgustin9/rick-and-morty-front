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
      <head>
        {/* DNS prefetch for faster DNS resolution */}
        <link rel="dns-prefetch" href="//rickandmortyapi.com" />
        
        {/* Preconnect for faster connection establishment */}
        <link rel="preconnect" href="https://rickandmortyapi.com" />
        <link rel="preconnect" href="https://rickandmortyapi.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
