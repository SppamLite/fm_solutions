import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const NumberInput = ({
  id,
  value,
  label,
  error,
  ...rest
}: Props) => (
  <div class="number-input flex flex-col">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type="number"
      value={value}
      disabled={!IS_BROWSER}
      {...rest}
    />
    {error && <p class="animation-in error">{error}</p>}
  </div>
);
