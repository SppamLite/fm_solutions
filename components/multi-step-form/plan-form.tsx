import { JSX } from "preact";
import { ToggleSwitch } from "./toggle-switch.tsx";
export type Props = {
  yearly: boolean;
  onCycleChange: JSX.GenericEventHandler<HTMLInputElement>;
};

export const PlanForm = ({ yearly, onCycleChange }: Props) => (
  <div>
    <h2 class="t-denim form-title">Select your plan</h2>
    <p class="t-gray">
      You have the option of monthly or yearly billing.
    </p>
    <form>
      <div class="flex items-center justify-center bill-cycle">
        <span class={`${yearly ? "t-gray" : "t-denim"} monthly`}>Monthly</span>
        <ToggleSwitch
          id="bill-cycle-switch"
          checked={yearly}
          onChange={onCycleChange}
        />
        <span class={`${yearly ? "t-denim" : "t-gray"} yearly`}>Yearly</span>
      </div>
    </form>
  </div>
);
