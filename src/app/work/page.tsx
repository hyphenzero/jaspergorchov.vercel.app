import { Container } from '@/components/container'
import { PageIntro } from '@/components/page-intro'
import { loadWork } from '@/lib/mdx'
import { type Metadata } from 'next'
import { Projects } from './projects'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Projects I’ve been working on.',
}

export default async function Work() {
  const projects = await loadWork()

  return (
    <>
      <PageIntro eyebrow="Work" title="Projects I’ve been working on.">
        <p>
          I create web-based apps and sites, 3D art, animations, graphic design work, and web-powered 3D experiences.
          Here you can find a repository of all my work.
        </p>
      </PageIntro>

      <Container className="isolate">
        <Projects projects={projects} />
      </Container>
    </>
  )
}
