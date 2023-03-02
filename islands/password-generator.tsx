import { useRef } from "preact/hooks";
import { computed, effect, useSignal } from "@preact/signals";
import { delay } from "nanodelay";
import { JSX } from "preact";
import { A, D, N, pipe, S } from "@mobily/ts-belt";
import { generate, Option as PasswordGenOption } from "@wcj/generate-password";
import copy from "copy-to-clipboard";

import { PasswordDisplay } from "../components/password-generator-app/password-display.tsx";
import { LengthSlider } from "../components/password-generator-app/length-slider.tsx";
import { Checkbox } from "../components/password-generator-app/checkbox.tsx";
import { StrengthMeter } from "../components/password-generator-app/strength-meter.tsx";
import { Button } from "../components/Button.tsx";

const defaultOption: PasswordGenOption = {
  upperCase: true,
  lowerCase: true,
  numeric: true,
  special: true,
};

const initGendPassword = generate({
  length: 20,
  ...defaultOption
});

const PasswordGenerator = () => {
  const controlRef = useRef<HTMLDivElement>(null);
  const passwordGenConfig = useSignal<PasswordGenOption>(defaultOption);
  const showCopied = useSignal<boolean>(false);
  const showWarn = useSignal<boolean>(false);

  // at least one option should be true
  const isValidConfig = computed(() =>
    pipe(
      passwordGenConfig.value,
      D.filter((v) => !!v),
      D.keys,
      A.length,
      N.gt(0),
    )
  );
  const characterLength = useSignal<number>(8);
  const gendPassword = useSignal<string>(initGendPassword);
  const password = computed<string>(() =>
    pipe(
      gendPassword.value,
      S.toArray,
      A.take(characterLength.value),
      A.join(""),
    )
  );

  const onCopy = () => {
    copy(password.value);
    showCopied.value = true;
  };

  const onCharacterLengthChange = (
    value: string,
  ) => {
    characterLength.value = Number(value);
  };

  const handleChangeConfig: JSX.GenericEventHandler<HTMLInputElement> = (
    { currentTarget },
  ) => {
    if (showWarn.value) {
      showWarn.value = false;
    }
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
    if (!isValidConfig.value) {
      showWarn.value = true;
      return;
    }
    gendPassword.value = generate({
      length: 20,
      ...passwordGenConfig.value,
    });
  };

  const disposeWarn = effect(() => {
    if (!showWarn.value) {
      return;
    }
    delay(3200).then(() => {
      showWarn.value = false;
    });
  });

  const disposeCopy = effect(() => {
    if (!showCopied.value) {
      return;
    }
    delay(3200).then(() => {
      showCopied.value = false;
    });
  });

  disposeWarn();
  disposeCopy();

  return (
    <div>
      <PasswordDisplay
        onCopy={onCopy}
        value={password.value}
        placeholder="P4$5W0rD!"
        showCopied={showCopied.value}
        copyDisabled={password.value.length === 0}
      />
      <div class="control-panel">
        <LengthSlider
          onCharacterLengthChange={onCharacterLengthChange}
          value={characterLength.value}
        />
        <div
          ref={controlRef}
          class={`control-panel__password-configs ${
            showWarn.value ? "warn horizontal-shake" : ""
          }`}
        >
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
