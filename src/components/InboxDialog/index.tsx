import { createSignal, Show, For } from "solid-js";
import { format, formatRelative } from "date-fns";
import { OutsideClickHandler } from "solid-outside-click-handler";
import { DUMMY_INBOX, DUMMY_CONVERSATION_HISTORY } from "./dummy";
import { TInbox } from "./types";
import { searchBlack } from "~/common/icons";

const CURRENT_USER = "Claren";

export default function InboxDialog() {
  // const [inboxDetail, setInboxDetail] = createSignal<TInbox | null>(null);
  const [inboxDetail, setInboxDetail] = createSignal<TInbox | null>(
    DUMMY_INBOX[0]
  );
  const [actionIndex, setActionIndex] = createSignal<number | null>(null);
  const openChatAction = (i: number) => {
    if (i === actionIndex()) {
      setActionIndex(null);
    } else {
      setActionIndex(i);
    }
  };
  return (
    <>
      <Show when={inboxDetail() === null}>
        <div class="mb-4 grid h-[45.875rem] w-[45.875rem] grid-rows-[2.125rem_1fr] rounded-md bg-white py-5 px-[1.8125rem]">
          <label
            for="search"
            class="relative block text-gray-400 focus-within:text-gray-600"
          >
            <input
              type="text"
              placeholder="Search"
              class="form-input w-full rounded-md border-2 border-primaryEmperor px-[3.75rem] py-1"
            />
            <img
              src="/assets/icons/search_24px_black.svg"
              class="pointer-events-none absolute top-1/2 right-4 h-3 w-3 transform"
              alt="search icon"
            />
          </label>
          <ul>
            <For each={DUMMY_INBOX}>
              {(inbox) => (
                <li
                  class={
                    "grid max-w-full cursor-pointer grid-cols-[3rem_1fr_0.75rem] items-center border-t-2 border-primaryMineshaft py-6 first:border-t-0 hover:bg-primaryAlto"
                  }
                  onClick={() => setInboxDetail(DUMMY_INBOX[0])}
                >
                  <div>Icon</div>
                  <div>
                    <div class="grid grid-cols-[26rem_1fr]">
                      <span class="font-bold text-primaryCornflowerBlue">
                        {inbox.subject}
                      </span>
                      <span class="justify-self-end">
                        {format(
                          inbox.latest_message.date * 1000,
                          "dd/MM/yyyy HH:mm"
                        )}
                      </span>
                    </div>
                    <Show when={inbox.participants.length > 2}>
                      <p class="font-bold">{`${inbox.latest_message.user.name} :`}</p>
                    </Show>
                    <div>
                      <p>{inbox.latest_message.content}</p>
                    </div>
                  </div>
                  <Show when={inbox.latest_message.is_unread}>
                    <img
                      src="/assets/icons/search_24px_black.svg"
                      alt="search icon"
                    />
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
      <Show when={inboxDetail() !== null}>
        <div class="mb-4 grid h-[45.875rem] w-[45.875rem] grid-rows-[4.75rem_1fr_2.5rem] rounded-md bg-white py-5">
          <div class="grid grid-cols-[1rem_1fr_1rem] gap-x-4 border-b-2 border-[#BDBDBD] px-[1.8125rem]">
            <button>
              <img src={searchBlack} alt="back icon" />
            </button>
            <div>
              <p class="font-bold text-primaryCornflowerBlue">
                I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
              </p>
              <small>{inboxDetail()?.participants.length} participants</small>
            </div>
            <div>X</div>
          </div>
          <div
            class="overflow-y-scroll px-4"
            style={{ height: "calc(100% - 1rem)" }}
          >
            <ul class="flex flex-col-reverse justify-end">
              <For each={DUMMY_CONVERSATION_HISTORY}>
                {(message, i) => (
                  <>
                    <li
                      class="mt-3 max-w-[70%] last:mt-0"
                      style={{
                        "align-self":
                          message.user.name === CURRENT_USER ? "end" : "start",
                      }}
                    >
                      <p
                        class={`${
                          message.user.name === CURRENT_USER
                            ? "text-right"
                            : "text-left"
                        } font-bold text-[#9B51E0]`}
                      >
                        {message.user.name === CURRENT_USER
                          ? "You"
                          : message.user.name}
                      </p>
                      <div
                        class={`flex items-start ${
                          message.user.name !== CURRENT_USER &&
                          "flex-row-reverse"
                        }`}
                      >
                        <div class="relative">
                          <button onClick={() => openChatAction(i())}>
                            <img src={searchBlack} alt="action icon" />
                          </button>
                          <Show when={actionIndex() === i()}>
                            <OutsideClickHandler
                              onOutsideClick={() => setActionIndex(null)}
                            >
                              <ul
                                class={`absolute z-10 w-32 rounded-md border-2 border-[#BDBDBD] bg-white ${
                                  message.user.name !== CURRENT_USER &&
                                  "right-0"
                                }`}
                              >
                                <li>
                                  <button class="h-12 w-full border-b-2 border-[#BDBDBD] px-[1.125rem] text-left text-[#2F80ED]">
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button class="h-12 w-full px-[1.125rem] text-left text-[#EB5757]">
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </OutsideClickHandler>
                          </Show>
                        </div>
                        <div class="rounded-md bg-[#EEDCFF] p-2.5">
                          <p>{message.content}</p>
                          <p>
                            {message.date
                              ? format(message.date * 1000, "HH:mm")
                              : "-"}
                          </p>
                        </div>
                      </div>
                    </li>
                    <Show
                      when={
                        DUMMY_CONVERSATION_HISTORY[i()].is_unread &&
                        i() < DUMMY_CONVERSATION_HISTORY.length - 1 &&
                        !DUMMY_CONVERSATION_HISTORY[i() + 1].is_unread
                      }
                    >
                      <div class="mt-3 grid  grid-cols-[1fr_max-content_1fr] items-center">
                        <div class="w-full border-t-2 border-[#EB5757]" />
                        <p class="px-4 text-lg font-bold text-[#EB5757]">
                          New Message
                        </p>
                        <div class="w-full border-t-2 border-[#EB5757]" />
                      </div>
                    </Show>
                    <Show
                      when={
                        (i() < DUMMY_CONVERSATION_HISTORY.length - 1 &&
                          formatRelative(
                            DUMMY_CONVERSATION_HISTORY[i()].date * 1000,
                            Date.now()
                          ) !==
                            formatRelative(
                              DUMMY_CONVERSATION_HISTORY[i() + 1].date * 1000,
                              Date.now()
                            )) ||
                        (i() === DUMMY_CONVERSATION_HISTORY.length - 1 &&
                          formatRelative(
                            DUMMY_CONVERSATION_HISTORY[i()].date * 1000,
                            Date.now()
                          ) !==
                            formatRelative(
                              DUMMY_CONVERSATION_HISTORY[i() - 1].date * 1000,
                              Date.now()
                            ))
                      }
                    >
                      <div class="mt-3 grid grid-cols-[1fr_max-content_1fr] items-center">
                        <div class="w-full border-t-2 border-[#4F4F4F]" />
                        <p class="px-4 text-lg font-bold text-[#4F4F4F]">
                          {format(
                            DUMMY_CONVERSATION_HISTORY[i()].date * 1000,
                            "MMMM dd y"
                          )}
                        </p>
                        <div class="w-full border-t-2 border-[#4F4F4F]" />
                      </div>
                    </Show>
                  </>
                )}
              </For>
            </ul>
          </div>
          <form class="w-100 grid grid-cols-[1fr_4.75rem] gap-x-4 px-4">
            <label for="text">
              <input
                name="text"
                type="text"
                class="h-full w-full rounded-md border-2 border-[#828282] px-4"
                placeholder="Type a new message"
              ></input>
            </label>
            <button class="h-12 rounded-md bg-[#2F80ED] px-[1.375rem] text-white">
              Send
            </button>
          </form>
        </div>
      </Show>
    </>
  );
}
