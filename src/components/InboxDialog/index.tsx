import { Show, For } from "solid-js";
import { format } from "date-fns";
import { DUMMY_INBOX } from "./dummy";

export default function InboxDialog() {
  return (
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
      <div>
        <For each={DUMMY_INBOX}>
          {(inbox) => (
            <div
              class={
                "grid h-32 max-w-full cursor-pointer grid-cols-[3rem_1fr_0.75rem] items-center border-t-2 border-primaryMineshaft py-6 first:border-t-0"
              }
            >
              <div>Icon</div>
              <div>
                <div class="grid grid-cols-[26rem_1fr]">
                  <span class="font-bold text-primaryCornflowerBlue">
                    {inbox.subject}
                  </span>
                  <span class="justify-self-end">
                    {format(inbox.date * 1000, "dd/MM/yyyy HH:mm")}
                  </span>
                </div>
                <Show when={inbox.participants.length > 2}>
                  <p class="font-bold">{`${inbox.latest_message.user.name} :`}</p>
                </Show>
                <div>
                  <p>{inbox.latest_message.content}</p>
                </div>
              </div>
              <Show when={inbox.is_unread}>
                <img
                  src="/assets/icons/search_24px_black.svg"
                  alt="search icon"
                />
              </Show>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
