'use client'

import { Project } from '@/lib/mdx'
import * as Headless from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import { MotionValue, motion, useMotionValueEvent, useScroll, useSpring, type HTMLMotionProps } from 'motion/react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import useMeasure, { type RectReadOnly } from 'react-use-measure'
import { Button } from './button'
import { Container } from './container'

const testimonials = [
  {
    img: '/work.png',
    name: 'Tina Yards',
    title: 'VP of Sales, Protocol',
    quote: 'Thanks to Radiant, we’re finding new leads that we never would have found with legal methods.',
  },
  {
    img: '/work.png',
    name: 'Conor Neville',
    title: 'Head of Customer Success, TaxPal',
    quote: 'Radiant made undercutting all of our competitors an absolute breeze.',
  },
  {
    img: '/work.png',
    name: 'Amy Chase',
    title: 'Head of GTM, Pocket',
    quote: 'We closed a deal in literally a few minutes because we knew their exact budget.',
  },
  {
    img: '/work.png',
    name: 'Veronica Winton',
    title: 'CSO, Planeteria',
    quote: 'We’ve managed to put two of our main competitors out of business in 6 months.',
  },
  {
    img: '/work.png',
    name: 'Dillon Lenora',
    title: 'VP of Sales, Detax',
    quote: 'I was able to replace 80% of my team with RadiantAI bots.',
  },
  {
    img: '/work.png',
    name: 'Harriet Arron',
    title: 'Account Manager, Commit',
    quote: 'I’ve smashed all my targets without having to speak to a lead in months.',
  },
]

function ProjectCard({
  title,
  img,
  bounds,
  scrollX,
  ...props
}: {
  img: string | StaticImport
  title: string
  bounds: RectReadOnly
  scrollX: MotionValue<number>
  onClick?: () => void
} & HTMLMotionProps<'div'>) {
  let ref = useRef<HTMLDivElement | null>(null)

  let computeOpacity = useCallback(() => {
    let element = ref.current
    if (!element || bounds.width === 0) return 1

    let rect = element.getBoundingClientRect()

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="group relative flex aspect-[4/3] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-xl sm:aspect-[16/10] sm:w-96"
    >
      <div className="absolute inset-0 z-20 rounded-xl ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10" />
      <div className="absolute inset-0">
        <Image alt="" src={img} className="object-cover" fill />
      </div>
      <div
        aria-hidden="true"
        className="from-[calc(7/16*100%)]_ _sm:from-25% absolute inset-0 rounded-xl bg-gradient-to-t from-zinc-950/75 opacity-0 ring-1 ring-inset ring-gray-950/10 transition-opacity duration-300 group-hover:opacity-100 dark:from-zinc-950"
      />
      <p className="z-10 p-4 text-sm/6 font-medium text-white opacity-0 group-hover:opacity-100">{title}</p>
    </motion.div>
  )
}

function CallToAction() {
  return (
    <div>
      <p className="max-w-sm text-sm/6 text-zinc-500 dark:text-zinc-400">
        I create websites, web apps, 3D art, graphic design, motion graphics and more, using professional tools and
        technologies.
      </p>
      <div className="mt-2">
        <Button plain href="#" className="-mx-[11px]">
          More work
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}

export function FeaturedWork({ work }: { work: Project[] }) {
  let scrollRef = useRef<HTMLDivElement | null>(null)
  let { scrollX } = useScroll({ container: scrollRef as React.RefObject<HTMLElement> })
  let [setReferenceWindowRef, bounds] = useMeasure()
  let [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollX, 'change', (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current!.children[0].clientWidth))
  })

  function scrollTo(index: number) {
    let gap = 32
    let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth
    scrollRef.current!.scrollTo({ left: (width + gap) * index })
  }

  return (
    <div className="overflow-hidden">
      <div
        ref={scrollRef}
        className={clsx([
          'flex gap-8 px-[var(--scroll-padding)]',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:calc((100vw-theme(maxWidth.2xl))/2+theme(spacing.6))] lg:[--scroll-padding:calc((100vw-theme(maxWidth.7xl))/2+theme(spacing.8))]',
        ])}
      >
        {work.map(({ cover, title }, projectIndex) => (
          <ProjectCard
            key={projectIndex}
            title={title}
            img={cover}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => scrollTo(projectIndex)}
          />
        ))}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-between">
          <CallToAction />
          <div className="hidden sm:flex sm:gap-2">
            {testimonials.map(({ name }, testimonialIndex) => (
              <Headless.Button
                key={testimonialIndex}
                onClick={() => scrollTo(testimonialIndex)}
                data-active={activeIndex === testimonialIndex ? true : undefined}
                aria-label={`Scroll to testimonial from ${name}`}
                className={clsx(
                  'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                  'data-[active]:bg-gray-400 data-[hover]:bg-gray-400',
                  'forced-colors:data-[active]:bg-[Highlight] forced-colors:data-[focus]:outline-offset-4'
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
