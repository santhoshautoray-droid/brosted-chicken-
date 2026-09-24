import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'THE BROAST FACTORY | Crispy Broasted Chicken & Fast Food Hyderabad',
    template: '%s | THE BROAST FACTORY',
  },
  description:
    'Experience Hyderabad’s crispiest broasted chicken, juicy burgers, wraps, sauced wings, and family bucket meals at THE BROAST FACTORY. Order online for delivery & pickup.',
  keywords: [
    'The Broast Factory',
    'Broasted Chicken Hyderabad',
    'Crispy Chicken Chanchalguda',
    'Fast Food Hyderabad',
    'Fried Chicken Delivery',
    'Burgers Hyderabad',
    'Wings Chanchalguda',
    'Pillar 1416 Chanchalguda',
  ],
  authors: [{ name: 'The Broast Factory' }],
  creator: 'The Broast Factory',
  publisher: 'The Broast Factory',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://thebroastfactory.com',
    siteName: 'THE BROAST FACTORY',
    title: 'THE BROAST FACTORY | Crispy Broasted Chicken in Hyderabad',
    description:
      'Pressure-fried golden broasted chicken, loaded burgers, crunchy wraps, and family buckets in Chanchalguda, Hyderabad. Order online now.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1200&h=630&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'The Broast Factory Crispy Broasted Chicken',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE BROAST FACTORY | Crispy Broasted Chicken in Hyderabad',
    description:
      'Ultra-crispy broasted chicken, loaded burgers, wings & family buckets in Hyderabad.',
    images: ['https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1200&h=630&auto=format&fit=crop&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#090D16] text-slate-100 font-sans antialiased selection:bg-purple-600/30 selection:text-purple-300">
        {children}
      </body>
    </html>
  );
}
