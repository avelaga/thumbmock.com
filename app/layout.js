import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'YouTube Thumbnail Mockup',
  description: 'Preview how your YouTube thumbnail will look on the homepage. Upload your thumbnail and title to see a realistic mockup alongside real videos.',
  keywords: ['youtube thumbnail', 'thumbnail mockup', 'thumbnail preview', 'youtube thumbnail tester', 'thumbnail generator', 'youtube thumbnail preview'],
  authors: [{ name: 'Abhi Velaga', url: 'https://abhi.work' }],
  creator: 'Abhi Velaga',
  metadataBase: new URL('https://thumbmock.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'YouTube Thumbnail Mockup',
    description: 'Preview how your YouTube thumbnail will look on the homepage. Upload your thumbnail and title to see a realistic mockup alongside real videos.',
    url: 'https://thumbmock.com',
    siteName: 'thumbmock.com',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/Icon.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Thumbnail Mockup Generator',
    description: 'Preview how your YouTube thumbnail will look on the homepage. Upload your thumbnail and title to see a realistic mockup alongside real videos.',
    images: ['/Icon.jpg'],
  },
  icons: {
    icon: '/Icon.jpg',
    apple: '/Icon.jpg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JR8H1TYZTQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JR8H1TYZTQ');
          `}
        </Script>
      </body>
    </html>
  );
}
