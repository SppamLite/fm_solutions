import { JSX } from "preact";
type Props = JSX.HTMLAttributes<HTMLInputElement>;

export const ToggleSwitch = ({ id = "toggle-switch", ...rest }: Props) => (
  <div class="toggle-switch flex">
    <input {...rest} type="checkbox" id={id} />
    <label for={id}>
      <span class="sr-only">Toggle</span>
    </label>
  </div>
);
