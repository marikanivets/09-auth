import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist or has been moved.',
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description: 'The page you are looking for does not exist or has been moved.',
    url: 'https://notehub.com',
    images: [
      {
        url: 'https://goit.global',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 | Page Not Found</h1>
      <p>This route does not exist.</p>
      <Link href="/notes/filter/all">Go to Dashboard</Link>
    </div>
  );
}
