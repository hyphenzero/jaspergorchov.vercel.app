import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { FeaturedWork } from '@/components/featured-work'
import { NavbarDivider } from '@/components/navbar'
import { Socials } from '@/components/socials'
import { loadWork } from '@/lib/mdx'
import { ChevronRightIcon, PlayIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

export default async function Home() {
  let work = await loadWork()

  return (
    <main className="overflow-hidden">
      <div className="relative top-0 -z-10 mx-auto w-full max-w-7xl">
        <div
          className={clsx(
            'absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0',
            'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-sky-400 from-[28%] via-teal-300 via-[70%] to-pink-300',
            'rotate-[-10deg] rounded-full blur-3xl'
          )}
        />
      </div>

        <Container className="py-16 lg:py-24">
          <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[length:clamp(2rem,3.75vw,3rem)] dark:text-white">
            I’m Jasper Gorchov, a 13-year-old web developer and digital artist.
          </h1>
          <div className="mt-12 items-center gap-x-6 sm:flex">
            <div className="flex items-center gap-x-6">
              <Button>
                Browse work <ChevronRightIcon />
              </Button>
              <Button outline>
                <PlayIcon />
                Watch the video
              </Button>
            </div>
            <div className="flex items-center gap-x-6 max-sm:mt-10">
              <NavbarDivider className="ml-3 max-sm:hidden" />
              <Socials />
            </div>
          </div>
        </Container>

      {/* <Container className="pb-24 sm:pb-32">
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative aspect-video overflow-clip rounded-xl">
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
            <Image fill className="aspect-video w-full object-cover" alt="" src={workImage} />
          </div>
          <div className="relative aspect-video overflow-clip rounded-xl">
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
            <Image fill className="aspect-video w-full object-cover" alt="" src={workImage} />
          </div>
          <div className="relative aspect-video overflow-clip rounded-xl">
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
            <Image fill className="aspect-video w-full object-cover" alt="" src={workImage} />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <Button className="-translate-x-3">
            More work <ArrowUpRightIcon />
          </Button>
          <div className="flex items-center gap-4">
            <Button
              color="light"
              aria-label="Previous"
              className="!rounded-full before:!rounded-full after:!rounded-full"
            >
              <ChevronLeftIcon />
            </Button>
            <Button color="light" aria-label="Next" className="!rounded-full before:!rounded-full after:!rounded-full">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
			</Container> */}

      <FeaturedWork work={work} />
    </main>
  )
}
