import { A } from "@mobily/ts-belt";
type Props = {
  onNav(step: number): void;
  currentStep: number;
};

const steps: { [key: number]: string } = {
  1: "YOUR INFO",
  2: "SELECT PLAN",
  3: "ADD-ONS",
  4: "SUMMARY",
};

export const StepNav = ({ onNav, currentStep }: Props) => {
  const onClick = (step: number) => () => onNav(step);
  return (
    <nav class="step-nav">
      <div class="step-nav__container flex">
        {A.makeWithIndex(4, (i) => i + 1).map((i) => (
          <div key={i} class="flex items-center">
            <button
              type="button"
              title={`Jump to step ${i}`}
              class={`nav-btn inline-flex items-center justify-center${
                currentStep === i ? " current" : ""
              }`}
              onClick={onClick(i)}
            >
              {i}
            </button>
            <div class="step-nav__detail">
              <span class="t-body-s t-light-blue">STEP {i}</span>
              <span class="t-white">{steps[i]}</span>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
