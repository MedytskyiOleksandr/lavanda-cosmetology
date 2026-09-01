import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lavanda Cosmetology',
    short_name: 'Lavanda',
    description: 'Професійна косметологія та нутриціологія у Києві.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#c8a2c8',
    icons: [
      {
        src: '/lavanda_icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
