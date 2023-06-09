import { Figtree } from 'next/font/google'

import getSongsByUserId from '@/actions/getSongsByUserId'

import Sidebar from '@/components/Sidebar'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'


import './globals.css'
import Player from '@/components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Vibify',
  description: 'Just Vibe',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>            
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player/>          
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}