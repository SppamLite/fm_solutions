import { JSX } from "preact";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Checkbox = ({ label, id, ...rest }: Props) => (
  <div class="checkbox">
    <input type="checkbox" {...rest} id={id} />
    <label htmlFor={id} class="t-light-gray">{label}</label>
  </div>
);
