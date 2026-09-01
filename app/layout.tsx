import type { Metadata } from 'next';
import { Inter, Judson, Junge } from 'next/font/google';
import './globals.css';

/**
 * Two serifs and a sans, each with one job: Junge for the headlines it was cut
 * for, Judson for titles and pull quotes where a little more weight is needed,
 * Inter for anything that has to be read rather than admired.
 */
const junge = Junge({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });
const judson = Judson({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-title', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'DIY Guide — Turn any DIY video into a build guide',
  description:
    'Paste a YouTube link or upload a clip. DIY Guide pulls out the materials, the tools and clear step-by-step instructions, so you can get on with making.',
  openGraph: {
    title: 'DIY Guide',
    description: 'Turn any DIY video into an interactive build guide in seconds.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${junge.variable} ${judson.variable} ${inter.variable}`}>
      <body className="bg-cream bg-grain">{children}</body>
    </html>
  );
}
