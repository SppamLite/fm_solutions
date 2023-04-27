type Props = {
  value: number;
};

export const RollingNumber = ({ value }: Props) => (
  // @ts-ignore
  <layflags-rolling-number
    value={value}
    class="t-purple"
    style="--roll-duration: 1500ms"
  >
  </layflags-rolling-number>
);
