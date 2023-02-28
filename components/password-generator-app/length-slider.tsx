import { useLayoutEffect, useRef } from "preact/hooks";
import { JSX } from "preact";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  value: number;
  onCharacterLengthChange(value: string): void;
};

const initMin = "0";
const initMax = "20";
const initDefaultValue = "10";

export const LengthSlider = ({
  value,
  onCharacterLengthChange,
  defaultValue = initDefaultValue,
  ...rest
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInput = () => {
    if (!inputRef.current) {
      return;
    }
    onCharacterLengthChange?.(inputRef.current.value);
    inputRef.current.style.setProperty("--value", inputRef.current.value);
  };

  useLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.style.setProperty("--min", initMin);
    inputRef.current.style.setProperty("--max", initMax);
    inputRef.current.style.setProperty("--value", initDefaultValue);
  }, []);

  return (
    <div>
      <div class="length-slider">
        <label htmlFor="character-length">Character Length</label>
        <span class="length-slider__value">{value}</span>
      </div>
      <input
        {...rest}
        id="character-length"
        type="range"
        min={initMin}
        max={initMax}
        step="1"
        class="styled-slider slider-progress"
        onInput={onInput}
        ref={inputRef}
        defaultValue={defaultValue}
      />
    </div>
  );
};
