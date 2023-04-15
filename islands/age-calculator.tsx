import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { A, D, N, O, pipe } from "@mobily/ts-belt";
import { getDaysInMonth, intervalToDuration } from "date-fns";
import { NumberInput } from "../components/age-calculator-app/NumberInput.tsx";
import { AgeDisplay } from "../components/age-calculator-app/AgeDisplay.tsx";
import { CalculateButton } from "../components/age-calculator-app/CalculateButton.tsx";

type Props = {
  defaultDay?: number;
  defaultMonth?: number;
  defaultYear?: number;
};
type Duration = {
  years?: number;
  months?: number;
  days?: number;
};

type InputError = {
  day: string;
  month: string;
  year: string;
};

type InputHandler = JSX.GenericEventHandler<HTMLInputElement>;

const getMaxDays = (month: number, year: number) =>
  getDaysInMonth(new Date(year, month - 1)); // come on, javascript 🙄

const AgeCalculator = ({
  defaultDay,
  defaultMonth,
  defaultYear,
}: Props) => {
  const dayOfBirth = useSignal<number>(defaultDay || 0);
  const monthOfBirth = useSignal<number>(defaultMonth || 0);
  const yearOfBirth = useSignal<number>(defaultYear || 0);
  const duration = useSignal<Duration | null>(null);
  const inputError = useSignal<InputError>({ day: "", month: "", year: "" });

  const isValidDate = (): boolean => {
    const now = new Date();
    const year = yearOfBirth.value;
    const month = monthOfBirth.value;
    const day = dayOfBirth.value;

    if (year < 1) {
      inputError.value = pipe(
        inputError.value,
        D.set("year", "Must be a valid month"),
      );
    }
    if (now.getFullYear() < year) {
      inputError.value = pipe(
        inputError.value,
        D.set("year", "Must be in the past"),
      );
    }

    if (month > 12 || month < 1) {
      inputError.value = pipe(
        inputError.value,
        D.set("month", "Must be a valid month"),
      );
    }

    const maxDays = getMaxDays(month, year);

    if (day > maxDays || day < 1) {
      inputError.value = pipe(
        inputError.value,
        D.set("day", "Must be a valid day"),
      );
    }

    return pipe(
      inputError.value,
      D.filter((value) => value !== ""),
      D.keys,
      A.length,
      N.lt(1),
    );
  };

  const handleCalculate = () => {
    const isValid = isValidDate();
    if (!isValid) return;

    const start = new Date(
      yearOfBirth.value,
      monthOfBirth.value,
      dayOfBirth.value,
    );
    const { years, months, days } = intervalToDuration({
      start,
      end: new Date(),
    });
    duration.value = {
      years,
      months,
      days,
    };
  };

  const handleValueChange: InputHandler = ({ currentTarget }) => {
    const id = currentTarget.id;
    const value = Number.parseInt(currentTarget.value);
    if (!value) return;
    if (id === "dayOfBirth") {
      dayOfBirth.value = value;
      inputError.value = pipe(
        inputError.value,
        D.set("day", ""),
      );
    }
    if (id === "monthOfBirth") {
      monthOfBirth.value = value;
      inputError.value = pipe(
        inputError.value,
        D.set("month", ""),
      );
    }
    if (id === "yearOfBirth") {
      yearOfBirth.value = value;
      inputError.value = pipe(
        inputError.value,
        D.set("year", ""),
      );
    }
  };

  return (
    <section class="animation-in">
      <div class="container flex flex-col">
        <form>
          <NumberInput
            value={dayOfBirth.value}
            id="dayOfBirth"
            label="DAY"
            onChange={handleValueChange}
            error={inputError.value.day}
          />
          <NumberInput
            value={monthOfBirth.value}
            id="monthOfBirth"
            label="MONTH"
            onChange={handleValueChange}
            error={inputError.value.month}
          />
          <NumberInput
            value={yearOfBirth.value}
            id="yearOfBirth"
            label="YEAR"
            onChange={handleValueChange}
            error={inputError.value.year}
          />
        </form>
        <CalculateButton onClick={handleCalculate} />
        <AgeDisplay
          years={duration.value?.years}
          months={duration.value?.months}
          days={duration.value?.days}
        />
      </div>
    </section>
  );
};

export default AgeCalculator;
