import { useSignal } from "@preact/signals";
import { PasswordDisplay } from "../components/password-generator-app/password-display.tsx";
import { LengthSlider } from "../components/password-generator-app/length-slider.tsx";

const PasswordGenerator = () => {
  const password = useSignal<string>("PTx1f5DaFX");
  const characterLength = useSignal<number>(10);

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
      </div>
    </div>
  );
};

export default PasswordGenerator;
