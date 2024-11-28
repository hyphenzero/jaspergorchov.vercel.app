import { Container } from '@/components/container'
import { FadeIn } from '@/components/fade-in'
import { MDXComponents } from '@/components/mdx-components'
import { InstagramIcon, XIcon } from '@/components/socials'
import { Tag } from '@/components/tag'
import { Text } from '@/components/text'
import { formatDate } from '@/lib/formatDate'
import { loadWork, type MDXEntry, type Project } from '@/lib/mdx'
import { LinkIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectWrapper({
  project,
  children,
}: {
  project: MDXEntry<Project>
  children: React.ReactNode
}) {
  let allWork = await loadWork()
  let moreWork = allWork.filter(({ metadata }) => metadata !== project).slice(0, 2)

  const projectTitle = project.title
  const matchingProject = allWork.find((project) => project.title === projectTitle)
  const projectHref = matchingProject ? matchingProject.href : null

  return (
    <>
      <article className="pt-8 sm:pt-12 lg:pt-24">
          <header className="mx-auto flex max-w-4xl flex-col px-6 text-center lg:px-8">
            <h1 className="mt-2 block text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[length:clamp(2rem,3.75vw,3rem)] dark:text-white">
              {project.title}
            </h1>
            <time
              dateTime={project.date}
              className="font-mono_ text-sm/5_ font-semibold_ uppercase_ tracking-widest_ text-sky-500_ dark:text-sky-400_ order-first block"
            >
              <Text>{formatDate(project.date, true)}</Text>
            </time>
            <div className="mt-6 flex items-center justify-center gap-6 [&_[data-slot=icon]]:size-5 [&_[data-slot=icon]]:text-zinc-600 [&_[data-slot=icon]]:transition hover:[&_[data-slot=icon]]:text-zinc-950 dark:[&_[data-slot=icon]]:text-zinc-400 dark:hover:[&_[data-slot=icon]]:text-white">
              {project.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
              {project.tags && <div aria-hidden="true" className="h-6 w-px bg-zinc-950/10 dark:bg-white/10" />}
              <Link
                href={`https://x.com/intent/tweet?original_referer=https%3A%2F%2Fjaspergorchov.com${projectHref}&text=Check%20out%20this%20project%20by%20Jasper%20Gorchov,%20a%2013-year-old%20developer,%20designer,%20and%20digital%20artist%3A&url=https%3A%2F%2Fjaspergorchov.com${projectHref}`}
                aria-label="Share this project via X"
              >
                <XIcon />
              </Link>
              <InstagramIcon />
              <LinkIcon />
            </div>
          </header>

          <Image
            src={project.cover}
            alt=""
						className="mx-auto mt-16 sm:mt-24 sm:w-[calc(100%-theme(spacing.8))] sm:rounded-2xl"
						unoptimized
          />

          <Container>
            <MDXComponents.wrapper className="mt-16">{children}</MDXComponents.wrapper>
          </Container>
      </article>

      {/* {moreArticles.length > 0 && (
        <PageLinks className="mt-24 sm:mt-32 lg:mt-40" title="More articles" pages={moreArticles} />
      )} */}
    </>
  )
}
