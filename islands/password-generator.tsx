import { computed, useSignal } from "@preact/signals";
import { JSX } from "preact";
import { A, D, N, pipe, S } from "@mobily/ts-belt";
import { generate, Option as PasswordGenOption } from "@wcj/generate-password";
import { PasswordDisplay } from "../components/password-generator-app/password-display.tsx";
import { LengthSlider } from "../components/password-generator-app/length-slider.tsx";
import { Checkbox } from "../components/password-generator-app/checkbox.tsx";
import { StrengthMeter } from "../components/password-generator-app/strength-meter.tsx";
import { Button } from "../components/Button.tsx";

const PasswordGenerator = () => {
  const passwordGenConfig = useSignal<PasswordGenOption>({
    upperCase: true,
    lowerCase: true,
    numeric: true,
    special: false,
  });

  const characterLength = useSignal<number>(10);
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

  const handleChangeConfig: JSX.GenericEventHandler<HTMLInputElement> = (
    { currentTarget },
  ) => {
    const checked = currentTarget.checked;
    const id = currentTarget.id;
    if (id in passwordGenConfig.value) {
      passwordGenConfig.value = {
        ...passwordGenConfig.value,
        [id]: checked,
      };
    }
  };

  const handleGenerate = () => {
    const isValidConfig = pipe(
      passwordGenConfig.value,
      D.filter((v) => !!v),
      D.keys,
      A.length,
      N.gt(0),
    ); // at least one option should be true
    if (!isValidConfig) {
      return;
    }
    gendPassword.value = generate({
      length: 20,
      ...passwordGenConfig.value,
    });
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
            checked={passwordGenConfig.value.upperCase}
            id="upperCase"
            label="Include Uppercase Letters"
            onChange={handleChangeConfig}
          />
          <Checkbox
            checked={passwordGenConfig.value.lowerCase}
            id="lowerCase"
            label="Include Lowercase Letters"
            onChange={handleChangeConfig}
          />
          <Checkbox
            checked={passwordGenConfig.value.numeric}
            id="numeric"
            label="Include Numbers"
            onChange={handleChangeConfig}
          />
          <Checkbox
            checked={passwordGenConfig.value.special}
            id="special"
            label="Include Symbols"
            onChange={handleChangeConfig}
          />
        </div>
        <StrengthMeter password={password.value} />
        <Button
          type="button"
          class="generate-btn"
          onClick={handleGenerate}
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
