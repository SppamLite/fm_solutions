import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { NumberInput } from "../components/age-calculator-app/NumberInput.tsx";
import { AgeDisplay } from "../components/age-calculator-app/AgeDisplay.tsx";

type Props = {
  defaultDay?: number;
  defaultMonth?: number;
  defaultYear?: number;
};

type InputHandler = JSX.GenericEventHandler<HTMLInputElement>;

const AgeCalculator = ({
  defaultDay,
  defaultMonth,
  defaultYear,
}: Props) => {
  const dayOfBirth = useSignal<number>(defaultDay || 0);
  const monthOfBirth = useSignal<number>(defaultMonth || 0);
  const yearOfBirth = useSignal<number>(defaultYear || 0);

  const handleValueChange: InputHandler = ({ currentTarget }) => {
    const id = currentTarget.id;
    const value = Number.parseInt(currentTarget.value);
    if (!value) return;
    if (id === "dayOfBirth") {
      dayOfBirth.value = value;
    }
    if (id === "monthOfBirth") {
      monthOfBirth.value = value;
    }
    if (id === "yearOfBirth") {
      yearOfBirth.value = value;
    }
  };

  return (
    <section class="animation-in">
      <form>
        <NumberInput
          value={dayOfBirth.value}
          id="dayOfBirth"
          label="DAY"
          onChange={handleValueChange}
        />
        <NumberInput
          value={monthOfBirth.value}
          id="monthOfBirth"
          onChange={handleValueChange}
          label="MONTH"
        />
        <NumberInput
          value={yearOfBirth.value}
          id="yearOfBirth"
          onChange={handleValueChange}
          label="YEAR"
        />
      </form>
      <AgeDisplay />
    </section>
  );
};

export default AgeCalculator;
