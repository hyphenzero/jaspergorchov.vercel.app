import { Article, Project } from '@/lib/mdx'
import { Button } from './button'
import { Input } from './input'
import { Logo } from './logo'
import { Socials, socials } from './socials'
import { Strong, Text } from './text'

const navigation = {
  work: [
    { name: 'Compositions Vol. 1', href: '/work/family-fund' },
    { name: 'ChatGPT Redesign', href: '/work/unseal' },
    { name: 'Refractions', href: '/work/phobia' },
    {
      name: (
        <>
          See all <span aria-hidden="true">&rarr;</span>
        </>
      ),
      href: '/work',
    },
  ],
  site: [
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
    { name: 'Blog', href: '/blog' },
    { name: 'Minecraft', href: '/minecraft' },
  ],
  connect: socials.map((profile) => ({
    name: profile.name,
    href: profile.href,
  })),
}

export function Footer({ work, articles }: { work: Project[]; articles: Article[] }) {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white dark:bg-zinc-950">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <Logo className="h-7" />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3>
                  <Text>
                    <Strong>Work</Strong>
                  </Text>
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {work.slice(0, 3).map((project) => (
                    <li key={project.href}>
                      <a href={project.href}>
                        <Text className="hover:text-zinc-950 dark:hover:text-white">{project.shortTitle}</Text>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="/work">
                      <Text className="hover:text-zinc-950 dark:hover:text-white">
                        See more <span aria-hidden="true">&rarr;</span>
                      </Text>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3>
                  <Text>
                    <Strong>Blog</Strong>
                  </Text>
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {articles.slice(0, 3).map((article) => (
                    <li key={article.href}>
                      <a href={article.href}>
                        <Text className="hover:text-zinc-950 dark:hover:text-white">{article.shortTitle}</Text>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="/blog">
                      <Text className="hover:text-zinc-950 dark:hover:text-white">
                        See more <span aria-hidden="true">&rarr;</span>
                      </Text>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Site</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.connect.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-zinc-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Connect</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.connect.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-zinc-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-zinc-950/10 dark:border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3>
              <Text>
                <Strong>Subscribe to my newsletter</Strong>
              </Text>
            </h3>
            <Text className="mt-1">My latest projects, articles, and news, sent to your inbox once in a while.</Text>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <Input id="email" name="email" type="email" required placeholder="Email address" autoComplete="email" />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <Button type="submit">Subscribe</Button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-zinc-950/10 dark:border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <Socials className="-ml-3" />
          <Text className="mt-8 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Jasper Gorchov. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
