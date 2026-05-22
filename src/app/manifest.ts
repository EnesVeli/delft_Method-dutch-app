import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Delft Dutch App',
    short_name: 'Delft Dutch',
    description: 'Learn Dutch efficiently using the Delft method.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#fb923c',
    icons: [
      {
        src: '/favicon.ico.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any maskable',
      },
      {
        src: '/favicon.ico.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any maskable',
      },
    ],
  };
}
