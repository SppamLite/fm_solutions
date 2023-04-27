import { G } from "@mobily/ts-belt";
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
      {G.isNumber(years)
        ? <RollingNumber value={years} />
        : <span class="animation-in t-purple">- -</span>}
      <span class="unit">years</span>
      {years && years > 100 && <span class="animation-in">🤨</span>}
    </h2>
    <h2>
      {G.isNumber(months)
        ? <RollingNumber value={months} />
        : <span class="animation-in t-purple">- -</span>}
      <span class="unit">months</span>
    </h2>
    <h2>
      {G.isNumber(days)
        ? <RollingNumber value={days} />
        : <span class="animation-in t-purple">- -</span>}
      <span class="unit">days</span>
    </h2>
  </div>
);
