import { Container } from '@/components/container'
import { FadeIn } from '@/components/fade-in'
import { MDXComponents } from '@/components/mdx-components'
import { InstagramIcon, XIcon } from '@/components/socials'
import { Tag } from '@/components/tag'
// import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'
import { loadArticles, type Article, type MDXEntry } from '@/lib/mdx'
import { LinkIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@/components/text'

export default async function ArticleWrapper({
  article,
  children,
}: {
  article: MDXEntry<Article>
  children: React.ReactNode
}) {
  let allArticles = await loadArticles()
  let moreArticles = allArticles.filter(({ metadata }) => metadata !== article).slice(0, 2)

  const articleTitle = article.title
  const matchingArticle = allArticles.find((article) => article.title === articleTitle)
  const articleHref = matchingArticle ? matchingArticle.href : null

  return (
    <>
      <article className="pt-8 sm:pt-12 lg:pt-24">
          <header className="mx-auto flex max-w-4xl flex-col px-6 text-center lg:px-8">
            <h1 className="mt-2 block text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[length:clamp(2rem,3.75vw,3rem)] dark:text-white">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first block font-mono_ text-sm/5_ font-semibold_ uppercase_ tracking-widest_ text-sky-500_ dark:text-sky-400_"
            >
              <Text>{formatDate(article.date, true)}</Text>
            </time>
            <div className="mt-6 flex items-center justify-center gap-6 [&_[data-slot=icon]]:size-5 [&_[data-slot=icon]]:text-zinc-600 [&_[data-slot=icon]]:transition hover:[&_[data-slot=icon]]:text-zinc-950 dark:[&_[data-slot=icon]]:text-zinc-400 dark:hover:[&_[data-slot=icon]]:text-white">
              {article.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
              {article.tags && <div aria-hidden="true" className="h-6 w-px bg-zinc-950/10 dark:bg-white/10" />}
              <Link
                href={`https://x.com/intent/tweet?original_referer=https%3A%2F%2Fjaspergorchov.com${articleHref}&text=Check%20out%20this%20article%20by%20Jasper%20Gorchov,%20a%2013-year-old%20developer,%20designer,%20and%20digital%20artist%3A&url=https%3A%2F%2Fjaspergorchov.com${articleHref}`}
                aria-label="Share this article via X"
              >
                <XIcon />
              </Link>
              <InstagramIcon />
              <LinkIcon />
            </div>
          </header>

          <Image
            src={article.cover}
            alt=""
            className="mx-auto mt-16 sm:w-[calc(100%-theme(spacing.8))] sm:rounded-2xl sm:mt-24"
          />

          <Container>
            <MDXComponents.wrapper className="mt-16">{children}</MDXComponents.wrapper>
          </Container>
      </article>

      {/* {moreArticles.length > 0 && (
        <PageLinks className="mt-24 sm:mt-32 lg:mt-40" title="More articles" pages={moreArticles} />
      )} */}

      {/* <ContactSection /> */}
    </>
  )
}
