import { JSX } from "preact";
import { AddOn, addons, availableAddons } from "./price-lookup.ts";
type Props = {
  selectedAddons: AddOn[];
  yearly: boolean;
  onChangeAddon: JSX.GenericEventHandler<HTMLInputElement>;
};

export const AddOnsForm = ({
  selectedAddons,
  onChangeAddon,
  yearly,
}: Props) => (
  <div class="animation-in">
    <h2 class="t-denim form-title">Pick add-ons</h2>
    <p class="t-gray">
      Add-ons help enhance your gaming experience.
    </p>
    <form>
      <div class="addons flex flex-col">
        {availableAddons.map((addon) => (
          <label for={addon} key={addon}>
            <input
              type="checkbox"
              name={addon}
              id={addon}
              checked={selectedAddons.includes(addon)}
              onChange={onChangeAddon}
            />
            <div
              class={`addon${
                selectedAddons.includes(addon) ? " checked" : ""
              } flex items-center`}
            >
              <div class="box inline-flex items-center justify-center">
                {selectedAddons.includes(addon) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                  >
                    <path
                      fill="none"
                      stroke="#FFF"
                      stroke-width="2"
                      d="m1 4 3.433 3.433L10.866 1"
                    />
                  </svg>
                )}
              </div>
              <div class="addon__detail flex flex-col">
                <span class="addon__name t-denim">{addons[addon].name}</span>
                <span class="addon__description t-gray">
                  {addons[addon].description}
                </span>
              </div>
              <div class="addon__price t-purple">
                {yearly
                  ? addons[addon].yearlyPrice
                  : addons[addon].monthlyPrice}/{yearly ? "yr" : "mo"}
              </div>
            </div>
          </label>
        ))}
      </div>
    </form>
  </div>
);
