import { createSignal, Show, For, createMemo } from "solid-js";
import { format, formatRelative } from "date-fns";
import { OutsideClickHandler } from "solid-outside-click-handler";
import {
  DUMMY_INBOX,
  DUMMY_GROUP_CONVERSATION_HISTORY,
  DUMMY_PERSONAL_CONVERSATION_HISTORY,
} from "./dummy";
import { TInbox, TBubbleColor } from "./types";
import {
  arrowBack,
  closeIcon,
  moreHorizontalIcon,
  personIcon,
  personWhiteIcon,
} from "~/common/icons";
import {
  GROUP_CHAT_BUBBLE_COLORS,
  PERSONAL_CHAT_BUBBLE_COLORS,
} from "~/common/colors";

const CURRENT_USER = "Claren";

type InboxDialogProps = {
  onClose: () => void;
};

export default function InboxDialog(props: InboxDialogProps) {
  const [inboxDetail, setInboxDetail] = createSignal<TInbox | null>(null);
  // const [inboxDetail, setInboxDetail] = createSignal<TInbox | null>(
  //   DUMMY_INBOX[0]
  // );
  const [actionIndex, setActionIndex] = createSignal<number | null>(null);
  const openChatAction = (i: number) => {
    if (i === actionIndex()) {
      setActionIndex(null);
    } else {
      setActionIndex(i);
    }
  };

  const bubbleColors = createMemo(() => {
    const colors: TBubbleColor = {};
    if (inboxDetail()) {
      inboxDetail()?.participants.forEach((participant, i) => {
        colors[participant.name] =
          GROUP_CHAT_BUBBLE_COLORS[i % GROUP_CHAT_BUBBLE_COLORS.length];
      });
    }

    return colors;
  });

  const numberOfParticipants = createMemo(() => {
    const getInboxDetail = inboxDetail();
    if (getInboxDetail) {
      return getInboxDetail.participants.length;
    }

    return 0;
  });

  const conversationHistory = createMemo(() =>
    numberOfParticipants() > 2
      ? DUMMY_GROUP_CONVERSATION_HISTORY
      : DUMMY_PERSONAL_CONVERSATION_HISTORY
  );

  return (
    <>
      <Show when={inboxDetail() === null}>
        <div class="mb-4 grid h-[45.875rem] w-[45.875rem] grid-rows-[2.125rem_1fr] rounded-md bg-white py-[24px] px-[32px]">
          <label
            for="search"
            class="relative block text-gray-400 focus-within:text-gray-600"
          >
            <input
              type="text"
              placeholder="Search"
              class="form-input w-full rounded-md border-2 border-primaryEmperor px-[3.75rem] py-1"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-10">
              <img
                src="/assets/icons/search_24px_black.svg"
                class="pointer-events-none"
                alt="search icon"
              />
            </span>
          </label>
          <div class="overflow-y-scroll">
            <ul>
              <For each={DUMMY_INBOX}>
                {(inbox, i) => (
                  <li
                    class={
                      "grid max-w-full cursor-pointer grid-cols-[3rem_1fr_0.75rem] items-center gap-x-2 border-t-2 border-primaryMineshaft py-[22px] first:border-t-0"
                    }
                    onClick={() =>
                      setInboxDetail(
                        inbox.participants.length > 2
                          ? DUMMY_INBOX[0]
                          : DUMMY_INBOX[DUMMY_INBOX.length - 1]
                      )
                    }
                  >
                    <div class="relative mt-2 h-max w-[3.1875rem] self-start">
                      <Show when={inbox.participants.length > 2}>
                        <div class="absolute left-1/4 z-10 flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-primaryCornflowerBlue">
                          <img src={personWhiteIcon} alt="person icon" />
                        </div>
                        <div class="absolute flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-[#E0E0E0]">
                          <img src={personIcon} alt="person icon" />
                        </div>
                      </Show>
                      <Show when={inbox.participants.length === 2}>
                        <div class="flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-primaryCornflowerBlue">
                          <span class="uppercase text-white">
                            {
                              inbox.participants[inbox.participants.length - 1]
                                .name[0]
                            }
                          </span>
                        </div>
                      </Show>
                    </div>
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
                      <div class="h-3 w-3 rounded-full bg-[#EB5757]" />
                    </Show>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </Show>
      <Show when={inboxDetail() !== null && bubbleColors() !== null}>
        <div class="mb-4 grid h-[45.875rem] w-[45.875rem] grid-rows-[4.75rem_1fr_2.5rem] rounded-md bg-white py-[24px]">
          <div class="grid grid-cols-[1rem_1fr_1rem] gap-x-4 border-b-2 border-[#BDBDBD] px-[32px]">
            <button onClick={() => setInboxDetail(null)}>
              <img src={arrowBack} alt="back icon" />
            </button>
            <div class="flex flex-col justify-center">
              <p class="font-bold text-primaryCornflowerBlue">
                {inboxDetail()?.subject}
              </p>
              <Show when={numberOfParticipants() > 2}>
                <small>{inboxDetail()?.participants.length} participants</small>
              </Show>
            </div>
            <button onClick={props.onClose}>
              <img src={closeIcon} alt="exit icon" />
            </button>
          </div>
          <div
            class="overflow-y-scroll px-4"
            style={{ height: "calc(100% - 1rem)" }}
          >
            <ul class="flex flex-col-reverse justify-end">
              <For each={conversationHistory()}>
                {(message, i) => (
                  <>
                    <li
                      class="mt-3 last:mt-0"
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
                        } font-bold`}
                        style={{
                          color:
                            numberOfParticipants() > 2
                              ? bubbleColors()[message.user.name].text
                              : message.user.name === CURRENT_USER
                              ? PERSONAL_CHAT_BUBBLE_COLORS.self.text
                              : PERSONAL_CHAT_BUBBLE_COLORS.interlocutor.text,
                        }}
                      >
                        {message.user.name === CURRENT_USER
                          ? "You"
                          : message.user.name}
                      </p>
                      <div
                        class={`flex items-start ${
                          message.user.name !== CURRENT_USER
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <div class="relative flex items-start">
                          <button
                            onClick={() => openChatAction(i())}
                            class="h-4 px-2"
                          >
                            <img
                              src={moreHorizontalIcon}
                              class="w-3"
                              alt="action icon"
                            />
                          </button>
                          <Show when={actionIndex() === i()}>
                            <OutsideClickHandler
                              onOutsideClick={() => setActionIndex(null)}
                            >
                              <ul
                                class={`absolute top-4 z-10 w-32 rounded-md border-2 border-[#BDBDBD] bg-white ${
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
                        <div
                          class="max-w-lg rounded-md p-2.5"
                          style={{
                            "background-color":
                              numberOfParticipants() > 2
                                ? bubbleColors()[message.user.name].background
                                : message.user.name === CURRENT_USER
                                ? PERSONAL_CHAT_BUBBLE_COLORS.self.background
                                : PERSONAL_CHAT_BUBBLE_COLORS.interlocutor
                                    .background,
                          }}
                        >
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
                        conversationHistory()[i()].is_unread &&
                        i() < conversationHistory().length - 1 &&
                        !conversationHistory()[i() + 1].is_unread
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
                        (i() < DUMMY_GROUP_CONVERSATION_HISTORY.length - 1 &&
                          formatRelative(
                            DUMMY_GROUP_CONVERSATION_HISTORY[i()].date * 1000,
                            Date.now()
                          ) !==
                            formatRelative(
                              DUMMY_GROUP_CONVERSATION_HISTORY[i() + 1].date *
                                1000,
                              Date.now()
                            )) ||
                        (i() === DUMMY_GROUP_CONVERSATION_HISTORY.length - 1 &&
                          formatRelative(
                            DUMMY_GROUP_CONVERSATION_HISTORY[i()].date * 1000,
                            Date.now()
                          ) !==
                            formatRelative(
                              DUMMY_GROUP_CONVERSATION_HISTORY[i() - 1].date *
                                1000,
                              Date.now()
                            ))
                      }
                    >
                      <div class="mt-3 grid grid-cols-[1fr_max-content_1fr] items-center">
                        <div class="w-full border-t-2 border-[#4F4F4F]" />
                        <p class="px-4 text-lg font-bold text-[#4F4F4F]">
                          {format(
                            DUMMY_GROUP_CONVERSATION_HISTORY[i()].date * 1000,
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
                class="h-full w-full rounded-md border-2 border-[#828282] px-[32px]"
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
