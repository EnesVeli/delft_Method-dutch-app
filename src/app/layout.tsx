import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── PWA Viewport ─────────────────────────────────────────────────────────────
// Exported separately as required by Next.js 14+ for viewport/themeColor config.
export const viewport: Viewport = {
  themeColor: '#fb923c',
  width: 'device-width',
  initialScale: 1,
};

// ─── Metadata & PWA Icons ─────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Delft Dutch App",
  description: "Learn Dutch efficiently using the Delft method.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Delft Dutch",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.ico.jpg",
    apple: "/favicon.ico.jpg",
    shortcut: "/favicon.ico.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Service Worker registration — runs only in the browser, ignored during SSR */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.warn('SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
