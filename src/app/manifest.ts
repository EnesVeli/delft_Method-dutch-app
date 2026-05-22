import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Delft Dutch App',
    short_name: 'Delft Dutch',
    description: 'Learn Dutch efficiently',
    start_url: '/',
    display: 'standalone', // This hides the browser URL bar!
    background_color: '#ffffff',
    theme_color: '#fb923c', 
    icons: [
      {
        src: '/apple-icon.jpg', 
        sizes: '192x192',
        type: 'image/jpeg',
      },
    ],
  };
}
