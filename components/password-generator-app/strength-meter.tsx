type Props = {
  password: string;
};

const strengths = ["TOO WEAK!", "WEAK", "MEDIUM", "STRONG"] as const;
type Strength = typeof strengths[number];

const ColorTable: Record<Strength, string> = {
  "TOO WEAK!": "red",
  "WEAK": "orange",
  "MEDIUM": "yellow",
  "STRONG": "green",
};

const getStrenth = (password: string): Strength => {
  // lets do length check for now
  // TODO: update to better password strength meter
  const length = password.length;
  switch (true) {
    case length < 5:
      return "TOO WEAK!";
    case length < 10:
      return "WEAK";
    case length < 15:
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

export const StrengthMeter = ({ password }: Props) => {
  const strength = getStrenth(password);
  return (
    <div class="strength-meter">
      <label class="t-gray">STRENGTH</label>
      <div class="strength-meter__container">
        <span class="t-light-gray strength-meter__value">{strength}</span>
        <div class="strength-meter__indicators">
          <Meater strength={strength} />
        </div>
      </div>
    </div>
  );
};
