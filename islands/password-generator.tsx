import { useSignal } from "@preact/signals";
import { PasswordDisplay } from "../components/password-generator-app/password-display.tsx";
import { LengthSlider } from "../components/password-generator-app/length-slider.tsx";
import { Checkbox } from "../components/password-generator-app/checkbox.tsx";

const PasswordGenerator = () => {
  const password = useSignal<string>("PTx1f5DaFX");
  const characterLength = useSignal<number>(10);
  const isUpperCase = useSignal<boolean>(true);
  const isLowerCase = useSignal<boolean>(true);
  const includeNumbers = useSignal<boolean>(true);
  const includeSymbols = useSignal<boolean>(false);

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
      </div>
    </div>
  );
};

export default PasswordGenerator;
