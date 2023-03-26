import { JSX } from "preact";
import { ToggleSwitch } from "./toggle-switch.tsx";

const availablePlans = ["Arcade", "Advanced", "Pro"] as const;
export type Plan = typeof availablePlans[number];
export type Props = {
  yearly: boolean;
  selectedPlan: Plan;
  onCycleChange: JSX.GenericEventHandler<HTMLInputElement>;
  onPlanChange: JSX.GenericEventHandler<HTMLInputElement>;
};

const planSVGs: { [key in Plan]: string } = {
  "Arcade": "icon-arcade.svg",
  "Advanced": "icon-advanced.svg",
  "Pro": "icon-pro.svg",
};

const monthlyPrices: { [key in Plan]: number } = {
  "Arcade": 9,
  "Advanced": 12,
  "Pro": 15,
};

const yearlyPrices: { [key in Plan]: number } = {
  "Arcade": 90,
  "Advanced": 120,
  "Pro": 150,
};

export const PlanForm = (
  { yearly, onCycleChange, selectedPlan, onPlanChange }: Props,
) => (
  <div class="animation-in">
    <h2 class="t-denim form-title">Select your plan</h2>
    <p class="t-gray">
      You have the option of monthly or yearly billing.
    </p>
    <form>
      <fieldset class="plans">
        {availablePlans.map((plan) => (
          <label for={plan} key={plan}>
            <input
              type="radio"
              id={plan}
              name="plan"
              value={plan}
              checked={selectedPlan === plan}
              onChange={onPlanChange}
            />
            <div
              class={`plan__detail${selectedPlan === plan ? " selected" : ""}`}
            >
              <img
                width="40"
                height="40"
                src={`/images/multi-step-form/${planSVGs[plan]}`}
                alt={`${plan} svg`}
              />
              <div class="flex flex-col">
                <span class="t-denim plan__name">{plan}</span>
                <span class="t-gray plan__price">
                  ${yearly ? yearlyPrices[plan] : monthlyPrices[plan]}/{yearly
                    ? "yr"
                    : "mo"}
                </span>
                {yearly && (
                  <span class="t-denim plan__free animation-in">
                    2 months free
                  </span>
                )}
              </div>
            </div>
          </label>
        ))}
      </fieldset>
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
