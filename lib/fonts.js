import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
  variable: '--font-cormorant',
});
