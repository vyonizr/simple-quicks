import { createSignal, Show, For } from "solid-js";
import CircularButton from "~/components/CircularButton";
import InboxDialog from "~/components/InboxDialog";
import TodoDialog from "~/components/TodoDialog";

type TMenuButton = {
  name: string;
  color: string;
  iconURL: string;
  activeIconURL: string;
};

const MENU_BUTTONS: TMenuButton[] = [
  {
    name: "Inbox",
    color: "#8785FF",
    iconURL: "/assets/icons/inbox.svg",
    activeIconURL: "/assets/icons/inbox_solid_white.svg",
  },
  {
    name: "Todo",
    color: "#F8B76B",
    iconURL: "/assets/icons/task.svg",
    activeIconURL: "/assets/icons/task_solid_white.svg",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [activeMenu, setActiveMenu] = createSignal<TMenuButton | null>(null);

  // const [isMenuOpen, setIsMenuOpen] = createSignal(true);
  // const [activeMenu, setActiveMenu] = createSignal<TMenuButton | null>(
  //   MENU_BUTTONS[1]
  // );

  const toggleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen());
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <section>
      <div class="fixed bottom-9 right-9 flex flex-col items-end">
        <Show when={activeMenu()?.name === "Inbox"}>
          <InboxDialog onClose={closeMenu} />
        </Show>
        <Show when={activeMenu()?.name === "Todo"}>
          <TodoDialog onClose={closeMenu} />
        </Show>
        {/* <OutsideClickHandler onOutsideClick={closeMenu}> */}
        <ul class="flex flex-row-reverse space-x-7 space-x-reverse">
          <li class="relative h-[4.25rem] w-[4.25rem]">
            <Show when={activeMenu() !== null}>
              <CircularButton
                onClick={closeMenu}
                class="absolute right-4 bg-primaryGray"
              />
              <CircularButton
                onClick={() => null}
                class="absolute z-10"
                style={{
                  "background-color": activeMenu()?.color,
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
                <img src="/assets/icons/shape_stroke.svg" alt="search icon" />
              </CircularButton>
            </Show>
          </li>
          <Show when={isMenuOpen()}>
            <For each={MENU_BUTTONS}>
              {(menu) => (
                <Show when={menu.name !== activeMenu()?.name}>
                  <li class="relative">
                    <Show when={activeMenu() === null}>
                      <p class="absolute -top-8 left-1/2 -translate-x-1/2 transform text-primaryConcrete">
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
  );
}
