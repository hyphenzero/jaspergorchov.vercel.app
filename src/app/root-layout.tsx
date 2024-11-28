'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Article, Project } from '@/lib/mdx'
import { clsx } from 'clsx'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function RootLayout({
  work,
  articles,
  children,
}: {
  work: Project[]
  articles: Article[]
  children: React.ReactNode
}) {
  let scrollYProgress = useMotionValue(0)

  let padding = useTransform(scrollYProgress, [0, 150], ['1.5rem', '0.2rem'])
  let borderOpacity = useTransform(scrollYProgress, [0, 150], [0, 0.1])

  useEffect(() => {
    function onScroll() {
      scrollYProgress.set(window.scrollY)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollYProgress])

  return (
    <>
      {/* <motion.header
        style={{ paddingTop: padding, paddingBottom: padding }}
        className={clsx(
          'fixed inset-x-0 top-0 z-10 flex items-center bg-white/80 backdrop-blur-lg dark:bg-zinc-950/80'
        )}
      >
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute bottom-0 h-px w-full bg-zinc-950 dark:bg-white"
        /> */}
			
      {/* <div className="-z-10 h-dvh fixed pointer-events-none max-w-7xl mx-auto inset-0 z-10 px-3 lg:px-4" aria-hidden="true">
        <div className="size-full border-x border-zinc-950/[7.5%] dark:border-white/[7.5%]" />
      </div> */}

      <Header />
      {/* </motion.header> */}

      {children}

      <Footer work={work} articles={articles} />
    </>
  )
}
