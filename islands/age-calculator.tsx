import { useSignal } from "@preact/signals";
import { NumberInput } from "../components/age-calculator-app/NumberInput.tsx";

type Props = {
  defaultDay?: number;
  defaultMonth?: number;
  defaultYear?: number;
};

const AgeCalculator = ({
  defaultDay,
  defaultMonth,
  defaultYear,
}: Props) => {
  const day = useSignal<number>(defaultDay || 0);
  const month = useSignal<number>(defaultMonth || 0);
  const year = useSignal<number>(defaultYear || 0);

  return (
    <section class="animation-in">
      <form>
        <NumberInput value={day.value} id="day" label="DAY" />
        <NumberInput value={month.value} id="month" label="MONTH" />
        <NumberInput value={year.value} id="year" label="YEAR" />
      </form>
    </section>
  );
};

export default AgeCalculator;
