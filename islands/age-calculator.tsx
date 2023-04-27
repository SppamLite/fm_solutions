import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { A, D, N, O, pipe } from "@mobily/ts-belt";
import { getDaysInMonth, intervalToDuration } from "date-fns";
import { NumberInput } from "../components/age-calculator-app/NumberInput.tsx";
import { AgeDisplay } from "../components/age-calculator-app/AgeDisplay.tsx";
import { CalculateButton } from "../components/age-calculator-app/CalculateButton.tsx";
import { useEffect } from "preact/hooks";

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

type GetDuration = {
  year: number;
  month: number;
  day: number;
};

type InputHandler = JSX.GenericEventHandler<HTMLInputElement>;

const getMaxDays = (month: number, year: number) =>
  getDaysInMonth(new Date(year, month - 1)); // come on, javascript 🙄

const getDuration = ({ year, month, day }: GetDuration) =>
  intervalToDuration({
    start: new Date(
      year,
      month,
      day,
    ),
    end: new Date(),
  });

const AgeCalculator = ({
  defaultDay,
  defaultMonth,
  defaultYear,
}: Props) => {
  const dayOfBirth = useSignal<number | null>(defaultDay || null);
  const monthOfBirth = useSignal<number | null>(defaultMonth || null);
  const yearOfBirth = useSignal<number | null>(defaultYear || null);
  const duration = useSignal<Duration | null>(null);
  const inputError = useSignal<InputError>({ day: "", month: "", year: "" });

  const isValidDate = (): boolean => {
    const now = new Date();
    const year = yearOfBirth.value || 0;
    const month = monthOfBirth.value || 0;
    const day = dayOfBirth.value || 0;

    if (year < 1) {
      inputError.value = pipe(
        inputError.value,
        D.set("year", "Must be a valid year"),
      );
    } else if (year < 1700) {
      inputError.value = pipe(
        inputError.value,
        D.set("year", "Must be over 1700 🤔"),
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
    const { years, months, days } = getDuration({
      year: yearOfBirth.value || 0,
      month: monthOfBirth.value || 0,
      day: dayOfBirth.value || 0,
    });

    duration.value = {
      years,
      months,
      days,
    };
  };

  const updateInputError = (id: string, isValid: boolean) => {
    if (isValid) {
      inputError.value = pipe(
        inputError.value,
        D.set(id, ""),
      );
    } else {
      inputError.value = pipe(
        inputError.value,
        D.set(id, "Invalid input"),
      );
    }
  };

  const handleValueChange: InputHandler = ({ currentTarget }) => {
    const id = currentTarget.id;
    const value = Number.parseInt(currentTarget.value);
    const isValid = !isNaN(value);

    if (id === "day") {
      dayOfBirth.value = value;
      updateInputError(id, isValid);
    }
    if (id === "month") {
      monthOfBirth.value = value;
      updateInputError(id, isValid);
    }
    if (id === "year") {
      yearOfBirth.value = value;
      updateInputError(id, isValid);
    }
  };

  useEffect(() => {
    if (!defaultDay || !defaultMonth || !defaultYear) return;
    const { years, months, days } = getDuration({
      year: defaultYear,
      month: defaultMonth,
      day: defaultDay,
    });

    duration.value = {
      years,
      months,
      days,
    };
  }, [defaultDay, defaultMonth, defaultYear]);

  return (
    <section class="animation-in">
      <div class="container flex flex-col">
        <form>
          <NumberInput
            value={dayOfBirth.value || ""}
            id="day"
            label="DAY"
            onChange={handleValueChange}
            error={inputError.value.day}
            placeholder="DD"
          />
          <NumberInput
            value={monthOfBirth.value || ""}
            id="month"
            label="MONTH"
            onChange={handleValueChange}
            error={inputError.value.month}
            placeholder="MM"
          />
          <NumberInput
            value={yearOfBirth.value || ""}
            id="year"
            label="YEAR"
            onChange={handleValueChange}
            error={inputError.value.year}
            placeholder="YYYY"
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
