'use client'

import { Input, InputGroup } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { formatDate } from '@/lib/formatDate'
import { Project } from '@/lib/mdx'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Bars3BottomLeftIcon, BarsArrowDownIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Text } from '@/components/text'

export function Projects({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const encodedTag = searchParams.get('tag')
  const tag = encodedTag ? decodeURIComponent(encodedTag) : 'All'

  const uniqueTags = new Set(projects.reduce((acc, project) => [...acc, ...project.tags], [] as string[]))
  const tags = ['All', ...Array.from(uniqueTags)]

  const handleTabChange = (index: number) => {
    const selectedTag = tags[index]
    router.push(`/work?tag=${encodeURIComponent(selectedTag)}`, { scroll: false })
  }

  const filteredProjects = projects.filter((project) => tag === 'All' || project.tags.includes(tag))

  return (
    <>
      <TabGroup selectedIndex={tags.indexOf(tag)} onChange={handleTabChange}>
        <div className="flex w-full justify-between border-b border-zinc-950/10 pb-6 max-md:flex-col max-md:gap-6 dark:border-white/10">
          <TabList className="flex gap-x-2">
            {tags.map((tag) => (
              <Tab
                key={tag}
                className="relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-500 outline-none data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5 data-[selected]:bg-zinc-950/5 data-[selected]:text-zinc-950 data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:data-[active]:fill-zinc-950 data-[slot=icon]:*:data-[hover]:fill-zinc-950 data-[slot=icon]:*:fill-zinc-500 data-[slot=avatar]:*:[--avatar-radius:theme(borderRadius.DEFAULT)] data-[slot=avatar]:*:[--ring-opacity:10%] sm:text-sm/5 sm:data-[slot=avatar]:*:size-6 sm:data-[slot=icon]:*:size-5 dark:text-zinc-400 dark:data-[active]:bg-white/5 dark:data-[hover]:bg-white/5 dark:data-[selected]:bg-white/5 dark:data-[selected]:text-white dark:data-[slot=icon]:*:data-[active]:fill-white dark:data-[slot=icon]:*:data-[hover]:fill-white dark:data-[slot=icon]:*:fill-zinc-400 data-[slot=icon]:last:[&:not(:nth-child(2))]:*:ml-auto data-[slot=icon]:last:[&:not(:nth-child(2))]:*:size-5 sm:data-[slot=icon]:last:[&:not(:nth-child(2))]:*:size-4"
              >
                {tag}
              </Tab>
            ))}
          </TabList>
          <div className="flex gap-4 max-md:order-first max-md:w-full">
            <div className="max-w-xl md:ml-auto">
              <Listbox
                name="sort-by"
                placeholder={
                  <div className="mr-2 flex gap-2">
                    <div className="flex h-6 items-center">
                      <Bars3BottomLeftIcon className="size-4" />
                    </div>
                    Sort by&hellip;
                  </div>
                }
              >
                <ListboxOption value="newest">
                  <BarsArrowDownIcon />
                  <ListboxLabel>Newest</ListboxLabel>
                </ListboxOption>
                <ListboxOption value="oldest">
                  <BarsArrowUpIcon />
                  <ListboxLabel>Oldest</ListboxLabel>
                </ListboxOption>
                <ListboxOption value="delayed">
                  <ListboxLabel>Delayed</ListboxLabel>
                </ListboxOption>
                <ListboxOption value="canceled">
                  <ListboxLabel>Canceled</ListboxLabel>
                </ListboxOption>
              </Listbox>
            </div>
            <div className="w-full flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search&hellip;" aria-label="Search" />
              </InputGroup>
            </div>
          </div>
        </div>
        <TabPanels>
          {tags.map((tag) => (
            <TabPanel key={tag}>
              <ul className="col-span-3 mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 xl:gap-x-8">
                {filteredProjects.map((project) => (
                  <li key={project.date}>
                    <div className="group relative before:absolute before:-inset-2.5 before:rounded-[20px] before:bg-zinc-950/5 before:opacity-0 hover:before:opacity-100 dark:before:bg-zinc-900">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/10">
                        <Image
                          fill
                          unoptimized
                          priority
                          src={project.cover}
                          alt=""
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                      <h4 className="mt-4 text-base font-medium text-zinc-950 dark:text-white">
                        <a href={project.href}>
                          <span className="absolute -inset-2.5 z-10"></span>
                          <span className="relative">{project.title}</span>
                        </a>
                      </h4>
                      <Text className="relative mt-1.5 flex items-center gap-1">
                        {tag === 'All' && (
                          <>
                            <span>{project.tags.join(', ')}</span>
                            <svg width="2" height="2" fill="currentColor" aria-hidden="true">
                              <circle cx="1" cy="1" r="1"></circle>
                            </svg>
                          </>
                        )}
                        <span>{formatDate(project.date)}</span>
                      </Text>
                    </div>
                  </li>
                ))}
              </ul>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  )
}
