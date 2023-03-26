import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { PersonalInfoForm } from "../components/multi-step-form/personal-info-form.tsx";
import { PlanForm } from "../components/multi-step-form/plan-form.tsx";
import { AddOnsForm } from "../components/multi-step-form/add-ons-form.tsx";
import { StepNav } from "../components/multi-step-form/step-nav.tsx";
import { Actions } from "../components/multi-step-form/actions.tsx";
import { AddOn, Plan } from "../components/multi-step-form/price-lookup.ts";

type ChangeHandler = JSX.GenericEventHandler<HTMLInputElement>;

const MultiStepForm = () => {
  const currentStep = useSignal<number>(3);
  const yearly = useSignal<boolean>(false);
  const selectedPlan = useSignal<Plan>("Arcade");
  const selectedAddons = useSignal<AddOn[]>([]);
  const onNav = (step: number) => currentStep.value = step;
  const onClickNext = () => currentStep.value += 1;
  const onClickBack = () => currentStep.value -= 1;
  const onClickConfirm = () => console.log("confirm");

  const onCycleChange: ChangeHandler = (
    { currentTarget },
  ) => yearly.value = currentTarget.checked;

  const onPlanChange: ChangeHandler = (
    { currentTarget },
  ) => selectedPlan.value = currentTarget.value as Plan;

  const onChangeAddon: ChangeHandler = ({ currentTarget }) => {
    const addonName = currentTarget.name as AddOn;
    const currentAddons = [...selectedAddons.value];
    if (currentAddons.includes(addonName)) {
      selectedAddons.value = currentAddons.filter((addon) =>
        addon !== addonName
      );
    } else {
      currentAddons.push(addonName);
      selectedAddons.value = currentAddons;
    }
  };

  return (
    <main class="animation-in">
      <StepNav onNav={onNav} currentStep={currentStep.value} />
      <section class="steps">
        <div class="steps__container">
          {currentStep.value === 1 && <PersonalInfoForm />}
          {currentStep.value === 2 && (
            <PlanForm
              onCycleChange={onCycleChange}
              onPlanChange={onPlanChange}
              yearly={yearly.value}
              selectedPlan={selectedPlan.value}
            />
          )}
          {currentStep.value === 3 && (
            <AddOnsForm
              selectedAddons={selectedAddons.value}
              yearly={yearly.value}
              onChangeAddon={onChangeAddon}
            />
          )}
          {currentStep.value === 4 && <div>Summary</div>}
          {currentStep.value === 5 && <div>Thank you!</div>}
        </div>
      </section>
      <Actions
        onClickNext={onClickNext}
        onClickBack={onClickBack}
        currentStep={currentStep.value}
        onClickConfirm={onClickConfirm}
      />
    </main>
  );
};

export default MultiStepForm;
