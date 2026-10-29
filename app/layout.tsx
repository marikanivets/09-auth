import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const BASE_URL = 'https://08-zustand-pied-three.vercel.app';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and efficient app for creating and organizing your notes',
  openGraph: {
    title: 'NoteHub',
    description: 'A simple and efficient app for creating and organizing your notes',
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
  twitter: {
    title: 'NoteHub',
    description: 'A simple and efficient app for creating and organizing your notes',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="uk">
      {}
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
