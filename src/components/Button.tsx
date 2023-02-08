import { JSX } from "solid-js";

type ButtonProps = {
  children?: JSX.Element;
  onClick: () => void;
  primary?: boolean;
  class?: string;
  style?: JSX.CSSProperties;
};

export default function Button(props: ButtonProps) {
  const bgColor = props.primary ? "bg-blue-600" : "bg-primaryConcrete";

  return (
    <button
      class={`${
        props.class || ""
      } ${bgColor} h-12 rounded-md px-[1.375rem] text-white`}
    >
      {props.children}
    </button>
  );
}
