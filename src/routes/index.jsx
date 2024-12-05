import { For, splitProps, Show, Switch, Match, createMemo } from 'solid-js'
import { A, createAsync, query } from '@solidjs/router'
import clsx from 'clsx'
import { Container } from '~/components/Container'
import { GitHubIcon, BlueSkyIcon, DiscordIcon } from '~/components/SocialIcons'
import graphql from '~/server/graphql.js'
import organizationQuery from '~/graphql/organization.query.js'
import { H1, H2, H3 } from '~/components/Atomic'

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div class="mt-16 sm:mt-20">
      <div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        <For each={new Array(5)}>
          {(_, imageIndex) => (
            <div
              class={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                rotations[imageIndex()]
              )}
            >
              <img
                src={`/photos/feature/${imageIndex()}.jpeg`}
                alt="Featured event photo"
                sizes="(min-width: 640px) 18rem, 11rem"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

function SocialLink(props) {
  const [local, other] = splitProps(props, ['icon'])

  return (
    <A class="group -m-1 p-1" {...other}>
      <local.icon class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </A>
  )
}

const organizationData = query(async () => {
  'use server'

  return graphql(organizationQuery.gql, organizationQuery.vars)
  // return {
  //   organization: {
  //     name: 'BoulderJS'
  //   }
  // }
}, 'organizationData')

export const route = {
  preload: () => organizationData()
}

export default function App() {
  // const readme = createAsync(() => readmeData())
  // const events = createAsync(() => eventsData())
  const organization = createAsync(() => organizationData())

  return (
    <>
      <Container class="mt-9">
        <div class="max-w-2xl">
          <H1>{organization()?.organization.name}</H1>
          {/* <Show when={readme}>
            <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              {readme()?.about?.content}
            </p>
          </Show> */}
          <div class="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/boulder-js"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://bsky.app/profile/boulderjs.org"
              aria-label="Follow on BlueSky"
              icon={BlueSkyIcon}
            />
            <SocialLink
              href="https://chat.boulderjs.org"
              aria-label="Join on Discord"
              icon={DiscordIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      {/* <Stats organization={organization} /> */}
      <div>
        <iframe 
          src="https://discord.com/widget?id=1083149430540206120&theme=dark" 
          width="350" 
          height="500" 
          allowtransparency="true" 
          frameborder="0" 
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">  
        </iframe>
      </div>
      <Container class="bg-white py-24 sm:py-32">
        <H2>Upcoming Events</H2>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* <For each={events()?.repository?.issues.nodes}>
            {(node) => <EventBox event={node} />}
          </For> */}
        </div>
      </Container>
    </>
  )
}

// TODO: CTAs
// - Subscribe calendar: https://calendar.boulderjs.org
// - Join Discord: https://chat.boulderjs.org
// - Follow on GitHub: https://github.com/boulder-js
// - Follow on LinkedIn: https://www.linkedin.com/groups/12659214/
// - Interact on GitHub to get invited to the organization
// - Subscribe email: mailerlite
