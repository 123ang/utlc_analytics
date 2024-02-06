import type { Metadata } from 'next';
import './globals.scss'
import { poppins } from './_data/_font';

export const metadata: Metadata = {
  title: 'ULTC Analytics',
  description: 'utlc_analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/favicon/favicon-16x16.png"  type="image/x-icon" sizes="16x16"/>
      <body className={poppins.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
