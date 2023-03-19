import { JSX } from "preact";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextInput = ({
  label,
  name,
  ...rest
}: Props) => (
  <div>
    <label for={name}>{label}</label>
    <input name={name} type="text" {...rest} />
  </div>
);
