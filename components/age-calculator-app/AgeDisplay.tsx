import { RollingNumber } from "./RollingNumber.tsx";

type Props = {
  years?: number;
  months?: number;
  days?: number;
};

export const AgeDisplay = ({
  years,
  months,
  days,
}: Props) => (
  <div class="age-display">
    <h2>
      {years ? <RollingNumber value={years} /> : "--"}
      <span>years</span>
    </h2>
    <h2>
      {months ? <RollingNumber value={months} /> : "--"}
      <span>months</span>
    </h2>
    <h2>
      {days ? <RollingNumber value={days} /> : "--"}
      <span>days</span>
    </h2>
  </div>
);
