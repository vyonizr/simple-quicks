import { For } from "solid-js";
import { format, formatRelative } from "date-fns";
import { moreHorizontalIcon } from "~/common/icons";
import Button from "~/components/Button";

type TodoDialogProps = {
  onClose: () => void;
};

type TTodo = {
  title: string;
  description: string;
  is_done: boolean;
  due_date: number;
};

type TTodoRow = {
  todo: TTodo;
};

const DUMMY_TODO_LIST = [
  {
    title:
      "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
    description:
      "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    is_done: false,
    due_date: Math.floor(Date.now() / 1000) + 86400,
  },
];

export default function TodoDialog(props: TodoDialogProps) {
  const TodoRow = (props: TTodoRow) => (
    <li>
      <input type="checkbox" />
      <div>
        <div>
          <p>{props.todo.title}</p>
          <div>{props.todo.due_date}</div>
        </div>
        <div>
          <span>X</span>
          <input
            type="date"
            value={format(props.todo.due_date * 1000, "yyyy-MM-dd")}
          />
        </div>
        <div>
          <span>X</span>
          <input type="textarea" />
        </div>
      </div>
      <img src={moreHorizontalIcon} class="w-3" alt="action icon" />
    </li>
  );

  return (
    <>
      <div class="mb-4 grid h-[45.875rem] w-[45.875rem] grid-rows-[2.125rem_1fr] rounded-md bg-white py-[24px] px-[32px]">
        <div class="relative flex justify-between">
          <button class="h-12 w-max rounded-md border-2 border-[#828282] px-[1.375rem]">
            My Tasks
          </button>
          <Button onClick={() => null} primary class="font-bold">
            New Task
          </Button>
          <ul
            class={`absolute top-14 z-10 hidden w-[18rem] rounded-md border-2 border-[#828282] bg-white`}
          >
            <li>
              <button class="h-12 w-full border-b-2 border-[#828282] px-[1.125rem] text-left">
                Personal Errands
              </button>
            </li>
            <li>
              <button class="h-12 w-full px-[1.125rem] text-left">
                Urgent To-Do
              </button>
            </li>
          </ul>
        </div>
        <ul>
          <For each={DUMMY_TODO_LIST}>
            {(todo, i) => <TodoRow todo={todo} />}
          </For>
        </ul>
      </div>
    </>
  );
}
