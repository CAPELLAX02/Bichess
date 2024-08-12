import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const pop = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Bichess',
  description: 'Your online chess platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={pop.className}>{children}</body>
    </html>
  );
}
