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
  <div class="age-display flex flex-col">
    <h2>
      {years
        ? <RollingNumber value={years} />
        : <span class="animation-in t-purple">--</span>}
      <span>years</span>
      {years && years > 100 && <span class="animation-in">🤨</span>}
    </h2>
    <h2>
      {months
        ? <RollingNumber value={months} />
        : <span class="animation-in t-purple">--</span>}
      <span>months</span>
    </h2>
    <h2>
      {days
        ? <RollingNumber value={days} />
        : <span class="animation-in t-purple">--</span>}
      <span>days</span>
    </h2>
  </div>
);
