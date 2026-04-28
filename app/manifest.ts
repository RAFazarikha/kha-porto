import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rachmad Aziz Fazarikha - Fullstack Web Developer',
    short_name: 'Rachmad Aziz',
    description: 'Fullstack Web Developer dari Indonesia yang berfokus pada pengembangan aplikasi web modern menggunakan Next.js, React, Laravel, dan framework modern lainnya.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}