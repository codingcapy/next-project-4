


import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import { AuthProvider } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex flex-col min-h-screen'>
          <AuthProvider>
            <Header />
            <main className='mx-auto px-2 py-2'>
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}