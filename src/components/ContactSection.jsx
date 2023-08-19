import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

const social = [
  {
    name: 'Dribbble',
    href: 'https://dribbble.com/hyphenzero',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/hyphenzero',
  },
]

export function ContactSection() {
  return (
    <Container className="py-24 sm:py-32">
      <FadeIn className="-mx-6 rounded-3xl bg-neutral-912 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              Let’s talk
            </h2>
            <div className="mt-6 flex items-center space-x-6">
              <Button href="/contact">Contact</Button>
              <span className="text-neutral-700">/</span>
              <p className="text-base font-medium text-white">
                Not currently available <br className="sm:hidden" /> for
                projects
              </p>
            </div>
            <div className="mt-10 flex space-x-24 border-t border-neutral-800 pt-10 text-sm text-neutral-300">
              <div className="flex flex-col space-y-1">
                <strong className="text-base mb-1 font-semibold text-white">Email</strong>
                <Link
                  href="mailto:hello@jaspergorchov.com"
                  className="transition-colors duration-200 hover:text-sky-300"
                >
                  hello@jaspergorchov.com
                </Link>
              </div>
              <div className="flex flex-col space-y-1">
                <strong className="text-base mb-1 font-semibold text-white">Socials</strong>
                {social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="transition-colors duration-200 hover:text-sky-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
