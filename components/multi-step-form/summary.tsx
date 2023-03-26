import { AddOn, addons, Plan, plans } from "./price-lookup.ts";

type Props = {
  selectedPlan: Plan;
  yearly: boolean;
  selectedAddons: AddOn[];
  onClickChange(): void;
  total: number;
};

export const Summary = ({
  yearly,
  selectedPlan,
  selectedAddons,
  onClickChange,
  total,
}: Props) => (
  <div class="animation-in">
    <h2 class="t-denim form-title">Finishing up</h2>
    <p class="t-gray">
      Double-check everything looks OK before confirming.
    </p>
    <div class="summary">
      <div class="summary__plan flex justify-between items-center">
        <div class="flex flex-col">
          <span class="t-denim summary__plan__name">
            {selectedPlan} ({yearly ? "Yearly" : "Monthly"})
          </span>
          <button class="t-gray" type="button" onClick={onClickChange}>
            Change
          </button>
        </div>
        <span class="t-denim summary__plan__price">
          ${yearly
            ? plans[selectedPlan].yearlyPrice
            : plans[selectedPlan].monthlyPrice}/{yearly ? "yr" : "mo"}
        </span>
      </div>
      {selectedAddons.length > 0 && (
        <div class="summary__addons flex flex-col">
          {selectedAddons.map((addon) => (
            <div
              key={addon}
              class="flex items-center justify-between summary__addon"
            >
              <span class="t-gray">{addons[addon].name}</span>
              <span class="t-denim">
                +${yearly
                  ? addons[addon].yearlyPrice
                  : addons[addon].monthlyPrice}/{yearly ? "yr" : "mo"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
    <div class="total flex items-center justify-between">
      <span class="t-gray name">
        Total ({yearly ? "per year" : "per month"})
      </span>
      <span class="t-purple price">${total}/{yearly ? "yr" : "mo"}</span>
    </div>
  </div>
);
