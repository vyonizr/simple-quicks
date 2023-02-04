import { JSX } from 'solid-js'

type CircularButtonProps = {
  children?: JSX.Element
  onClick: () => void
  primary?: boolean
  class?: string
  style?: JSX.CSSProperties
}

const CircularButton = (props: CircularButtonProps) => {
  const bgColor = props.primary ? 'bg-blue-600' : 'bg-primaryConcrete'

  return (
    <button
      class={`${
        props.class || ''
      } ${bgColor} h-[4.25rem] w-[4.25rem] flex justify-center items-center rounded-full`}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  )
}

export default CircularButton
