import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { RootLayout } from './root-layout'
import { loadWork, loadArticles } from '@/lib/mdx'

export const metadata: Metadata = {
  title: {
    template: '%s - Jasper Gorchov',
    default: 'Jasper Gorchov — 13-year-old developer, designer, and digital artist.',
  },
  description:
    'I’m Jasper, and I create sites, illustrations, and experiences with professional tools and technologies.',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
	const work = await loadWork()
	const articles = await loadArticles()

  return (
    <html lang="en" className="h-full bg-white antialiased dark:bg-zinc-950">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout work={work} articles={articles}>{children}</RootLayout>
      </body>
    </html>
  )
}
