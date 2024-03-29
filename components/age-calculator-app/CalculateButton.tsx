import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

type Props = JSX.HTMLAttributes<HTMLButtonElement>;

export const CalculateButton = ({
  disabled,
  ...rest
}: Props) => (
  <div class="calculate-button flex">
    <button
      {...rest}
      disabled={!IS_BROWSER || disabled}
      type="button"
      class="inline-flex justify-center items-center"
    >
      <span class="sr-only">calculate button</span>
      <svg
        width="46"
        height="44"
        viewBox="0 0 46 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 22.0189C8.33333 21.6859 23 25.6158 23 44"
          stroke="white"
          stroke-width="2"
        />
        <path d="M23 44V0" stroke="white" stroke-width="2" />
        <path
          d="M45 22.0189C37.6667 21.6859 23 25.6158 23 44"
          stroke="white"
          stroke-width="2"
        />
      </svg>
    </button>
  </div>
);
