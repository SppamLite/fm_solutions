import { passwordStrength } from "check-password-strength";
type Props = {
  password: string;
  fixed: boolean;
};

const strengths = ["TOO WEAK!", "WEAK", "MEDIUM", "STRONG"] as const;
type Strength = typeof strengths[number];

const ColorTable: Record<Strength, string> = {
  "TOO WEAK!": "red",
  "WEAK": "orange",
  "MEDIUM": "yellow",
  "STRONG": "green",
};

const getStrength = (password: string, fixed: boolean): Strength => {
  // for display purpose 😁
  if (fixed && password.includes("PTx1f5DaFX") && password.length < 15) {
    return "MEDIUM";
  }
  const { id } = passwordStrength(password);
  switch (id) {
    case 0:
      return "TOO WEAK!";
    case 1:
      return "WEAK";
    case 2:
      return "MEDIUM";
    default:
      return "STRONG";
  }
};

const Meater = ({ strength }: { strength: Strength }) => {
  const lightsUp = strengths.indexOf(strength);
  return (
    <>
      {Array.from(Array(4).keys()).map((key, index) => (
        <span
          key={key}
          class={`strength-meter__indicator ${
            index <= lightsUp ? "on" : "off"
          } ${ColorTable[strength]}`}
        >
        </span>
      ))}
    </>
  );
};

export const StrengthMeter = ({ password, fixed }: Props) => {
  const strength = getStrength(password, fixed);
  return (
    <div class="strength-meter">
      <label class="t-gray">STRENGTH</label>
      <div class="strength-meter__container">
        {password.length <= 4
          ? (
            <span class="t-light-gray strength-meter__value">
              SERIOUSLY? 🙂
            </span>
          )
          : (
            <>
              <span class="t-light-gray strength-meter__value">{strength}</span>
              <div class="strength-meter__indicators">
                <Meater strength={strength} />
              </div>
            </>
          )}
      </div>
    </div>
  );
};
