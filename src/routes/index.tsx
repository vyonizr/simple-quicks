import { createSignal, Show, For, createEffect } from 'solid-js'
import CircularButton from '../components/CircularButton'
import { OutsideClickHandler } from 'solid-outside-click-handler'

type TMenuButton = {
  name: string
  color: string
  iconURL: string
  activeIconURL: string
}

type TMessage = {
  user: TUser
  content: string
}

type TUser = {
  name: string
}

type TInbox = {
  subject: string
  is_unread: boolean
  participants: TUser[]
  latest_message: TMessage
  date: number
}

const MENU_BUTTONS: TMenuButton[] = [
  {
    name: 'Inbox',
    color: '#8785FF',
    iconURL: '/assets/icons/inbox.svg',
    activeIconURL: '/assets/icons/inbox_solid_white.svg',
  },
  {
    name: 'Task',
    color: '#F8B76B',
    iconURL: '/assets/icons/task.svg',
    activeIconURL: '/assets/icons/task_solid_white.svg',
  },
]

const DUMMY_INBOX: TInbox[] = [
  {
    subject: '109220-Naturalization',
    is_unread: true,
    participants: [
      {
        name: 'Cameron Phillips',
      },
      {
        name: 'Ellen',
      },
    ],
    latest_message: {
      user: {
        name: 'Cameron Phillips',
      },
      content: 'Please check this out!',
    },
    date: 1641039000,
  },
  {
    subject:
      'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]',
    is_unread: true,
    participants: [
      {
        name: 'Cameron Phillips',
      },
      {
        name: 'Ellen',
      },
      {
        name: 'Fitrahtur Rahman',
      },
    ],
    latest_message: {
      user: {
        name: 'Ellen',
      },
      content: 'Hey, please read.',
    },
    date: 1622605500,
  },
  {
    subject: '8405-Diana SALAZAR MUNGUIA',
    is_unread: true,
    participants: [
      {
        name: 'Cameron Phillips',
      },
      {
        name: 'Ellen',
      },
      {
        name: 'Fitrahtur Rahman',
      },
    ],
    latest_message: {
      user: {
        name: 'Cameron Phillips',
      },
      content:
        'I understand your initial concerns and thats very valid, Elizabeth. But you ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    date: 1654060770,
  },
  {
    subject: 'FastVisa Support',
    is_unread: true,
    participants: [
      {
        name: 'FastVisa Support',
      },
      {
        name: 'Fitrahtur Rahman',
      },
    ],
    latest_message: {
      user: {
        name: 'FastVisa Support',
      },
      content: 'Hey there! Welcome to your inbox.',
    },
    date: 1654060740,
  },
]

export default function Home() {
  // const [isMenuOpen, setIsMenuOpen] = createSignal(false)
  // const [activeMenu, setActiveMenu] = createSignal<MenuButton | null>(null)

  const [isMenuOpen, setIsMenuOpen] = createSignal(true)
  const [activeMenu, setActiveMenu] = createSignal<TMenuButton | null>(
    MENU_BUTTONS[0]
  )

  const toggleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen())
  }

  // const renderMenu = (activeMenu: MenuButton | null) => {
  //   if (activeMenu) {
  //     if (activeMenu.name === 'Inbox') {
  //       return (
  //         <div class='bg-primaryConcrete h-[45.875rem] w-[45.875rem] mb-4 rounded-md'></div>
  //       )
  //     }
  //   }
  // }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveMenu(null)
  }

  return (
    <section>
      <div class='fixed bottom-9 right-9 flex flex-col items-end'>
        <Show when={activeMenu()?.name === 'Inbox'}>
          <div class='bg-white h-[45.875rem] w-[45.875rem] mb-4 rounded-md py-5 px-[1.8125rem] grid grid-rows-[2.125rem_1fr]'>
            <label
              for='search'
              class='text-gray-400 focus-within:text-gray-600 block relative'
            >
              <input
                type='text'
                placeholder='Search'
                class='px-[3.75rem] form-input w-full py-1 border-2 border-primaryEmperor rounded-md'
              />
              <img
                src='/assets/icons/search_24px_black.svg'
                class='pointer-events-none absolute top-1/2 transform right-4 w-3 h-3'
                alt='search icon'
              />
            </label>
            <div>
              <For each={DUMMY_INBOX}>
                {(inbox) => (
                  <div class='bg-blue grid'>
                    <div>Icon</div>
                    <div>
                      <div>
                        <span>{inbox.subject}</span>
                        <span>{inbox.date}</span>
                      </div>
                      <Show when={inbox.participants.length > 2}>
                        <p>{`${inbox.latest_message.user.name} :`}</p>
                      </Show>
                      <p>{`${inbox.latest_message.content} :`}</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
        {/* <OutsideClickHandler onOutsideClick={closeMenu}> */}
        <ul class='flex flex-row-reverse space-x-7 space-x-reverse'>
          <li class='relative h-[4.25rem] w-[4.25rem]'>
            <Show when={activeMenu() !== null}>
              <CircularButton
                onClick={closeMenu}
                class='bg-primaryGray absolute right-4'
              />
              <CircularButton
                onClick={() => null}
                class='absolute z-10'
                style={{
                  'background-color': activeMenu()?.color,
                }}
              >
                <img
                  src={activeMenu()?.activeIconURL}
                  alt={`${activeMenu()?.name} icon`}
                />
              </CircularButton>
            </Show>
            <Show when={activeMenu() === null}>
              <CircularButton onClick={toggleMenuVisibility} primary>
                <img src='/assets/icons/shape_stroke.svg' alt='search icon' />
              </CircularButton>
            </Show>
          </li>
          <Show when={isMenuOpen()}>
            <For each={MENU_BUTTONS}>
              {(menu) => (
                <Show when={menu.name !== activeMenu()?.name}>
                  <li class='relative'>
                    <Show when={activeMenu() === null}>
                      <p class='absolute text-primaryConcrete -top-8 left-1/2 transform -translate-x-1/2'>
                        {menu.name}
                      </p>
                    </Show>
                    <CircularButton onClick={() => setActiveMenu(menu)}>
                      <img src={menu.iconURL} alt={`${menu.name} icon`} />
                    </CircularButton>
                  </li>
                </Show>
              )}
            </For>
          </Show>
        </ul>
        {/* </OutsideClickHandler> */}
      </div>
    </section>
  )
}
