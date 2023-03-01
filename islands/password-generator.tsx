import { computed, useSignal } from "@preact/signals";
import { A, pipe, S } from "@mobily/ts-belt";
import { PasswordDisplay } from "../components/password-generator-app/password-display.tsx";
import { LengthSlider } from "../components/password-generator-app/length-slider.tsx";
import { Checkbox } from "../components/password-generator-app/checkbox.tsx";
import { StrengthMeter } from "../components/password-generator-app/strength-meter.tsx";
import { Button } from "../components/Button.tsx";

const PasswordGenerator = () => {
  const characterLength = useSignal<number>(10);
  const isUpperCase = useSignal<boolean>(true);
  const isLowerCase = useSignal<boolean>(true);
  const includeNumbers = useSignal<boolean>(true);
  const includeSymbols = useSignal<boolean>(false);

  // TODO: re-generate password based on the change of the above configs
  const gendPassword = useSignal<string>("PTx1f5DaFXsMyB^xse4&flMMi");
  const password = computed<string>(() =>
    pipe(
      gendPassword.value,
      S.toArray,
      A.take(characterLength.value),
      A.join(""),
    )
  );
  const onCopy = () => {};

  const onCharacterLengthChange = (
    value: string,
  ) => {
    characterLength.value = Number(value);
  };

  return (
    <div>
      <PasswordDisplay
        onCopy={onCopy}
        value={password.value}
        placeholder="P4$5W0rD!"
      />
      <div class="control-panel">
        <LengthSlider
          onCharacterLengthChange={onCharacterLengthChange}
          value={characterLength.value}
        />
        <div class="control-panel__password-configs">
          <Checkbox
            checked={isUpperCase.value}
            id="uppercase"
            label="Include Uppercase Letters"
          />
          <Checkbox
            checked={isLowerCase.value}
            id="lowercase"
            label="Include Lowercase Letters"
          />
          <Checkbox
            checked={includeNumbers.value}
            id="numbers"
            label="Include Numbers"
          />
          <Checkbox
            checked={includeSymbols.value}
            id="symbols"
            label="Include Symbols"
          />
        </div>
        <StrengthMeter password={password.value} />
        <Button
          class="generate-btn"
          type="button"
          disabled={password.value.length === 0}
        >
          <span>GENERATE</span>
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#24232C"
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
