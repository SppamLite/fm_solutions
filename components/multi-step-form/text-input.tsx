import { JSX } from "preact";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextInput = ({
  label,
  name,
  error,
  ...rest
}: Props) => (
  <div class="text-input">
    <div class="flex">
      <label for={name} class="t-denim">{label}</label>
      {error && <div class="animation-in error">{error}</div>}
    </div>
    <input
      name={name}
      type="text"
      class={`${error ? "error" : ""}`}
      {...rest}
    />
  </div>
);
