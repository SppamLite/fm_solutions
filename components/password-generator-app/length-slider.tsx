import { useRef } from "preact/hooks";
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

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

  return (
    <div>
      <div class="length-slider">
        <label htmlFor="character-length" class="t-light-gray">
          Character Length
        </label>
        <span class="length-slider__value">{value}</span>
      </div>
      <input
        {...rest}
        style={{
          "--min": initMin,
          "--max": initMax,
          "--value": initDefaultValue,
        }}
        id="character-length"
        type="range"
        min={initMin}
        max={initMax}
        step="1"
        class="styled-slider slider-progress"
        onInput={onInput}
        ref={inputRef}
        defaultValue={defaultValue}
        disabled={!IS_BROWSER || rest.disabled}
      />
    </div>
  );
};
