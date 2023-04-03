import { JSX } from "preact";
import { computed, useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { PersonalInfoForm } from "../components/multi-step-form/personal-info-form.tsx";
import { PlanForm } from "../components/multi-step-form/plan-form.tsx";
import { AddOnsForm } from "../components/multi-step-form/add-ons-form.tsx";
import { StepNav } from "../components/multi-step-form/step-nav.tsx";
import { Actions } from "../components/multi-step-form/actions.tsx";
import {
  AddOn,
  addons,
  Plan,
  plans,
} from "../components/multi-step-form/price-lookup.ts";
import { Summary } from "../components/multi-step-form/summary.tsx";
import {
  getValidationError,
  PersonalInfo,
  PersonalInfoError,
} from "../components/multi-step-form/personal-info.ts";
import { ThankYou } from "../components/multi-step-form/thank-you.tsx";

type ChangeHandler = JSX.GenericEventHandler<HTMLInputElement>;

const MultiStepForm = () => {
  // signals
  const currentStep = useSignal<number>(1);
  const yearly = useSignal<boolean>(false);
  const isValidInfo = useSignal<boolean>(false);
  const selectedPlan = useSignal<Plan>("Arcade");
  const selectedAddons = useSignal<AddOn[]>([]);
  const personalInfo = useSignal<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const personalInfoError = useSignal<PersonalInfoError>({});

  const total = computed(() => {
    const planCost = yearly.value
      ? plans[selectedPlan.value].yearlyPrice
      : plans[selectedPlan.value].monthlyPrice;
    const addonsCost = selectedAddons.value.reduce((acc, curr) => {
      const addonCost = yearly.value
        ? addons[curr].yearlyPrice
        : addons[curr].monthlyPrice;
      acc += addonCost;
      return acc;
    }, 0);
    return planCost + addonsCost;
  });

  // form steps
  const onClickBack = () => currentStep.value -= 1;
  const onClickChange = () => currentStep.value = 2;

  // form control groups
  const onCycleChange: ChangeHandler = (
    { currentTarget },
  ) => yearly.value = currentTarget.checked;

  const onPlanChange: ChangeHandler = (
    { currentTarget },
  ) => selectedPlan.value = currentTarget.value as Plan;

  const onInputChange: ChangeHandler = ({ currentTarget }) => {
    const name = currentTarget.name;
    const value = currentTarget.value;
    if (personalInfoError.value[name]) {
      personalInfoError.value = {
        ...personalInfoError.value,
        [name]: "",
      };
    }
    personalInfo.value = {
      ...personalInfo.value,
      [name]: value,
    };
  };

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

  const changeStep = (step?: number) => {
    if (currentStep.value !== 1) {
      currentStep.value = step || (currentStep.value + 1);
      return;
    }
    const error = getValidationError(personalInfo.value);
    if (!error) {
      currentStep.value = step || (currentStep.value + 1);
      isValidInfo.value = true;
      personalInfoError.value = {};
    } else {
      isValidInfo.value = false;
      personalInfoError.value = {
        ...personalInfoError.value,
        ...error,
      };
    }
  };

  const onClickNext = () => changeStep();
  const onNav = (step: number) => changeStep(step);

  const isAdjustedHeight = currentStep.value === 2;

  return (
    <main class={`${isAdjustedHeight ? "adjusted" : ""}`}>
      <h1 class="sr-only">Multi Step Form</h1>
      <StepNav onNav={onNav} currentStep={currentStep.value} />
      <section class="steps">
        <h2 class="sr-only">Form Steps</h2>
        <div class="steps__container">
          {currentStep.value === 1 && (
            <PersonalInfoForm
              onInputChange={onInputChange}
              personalInfo={personalInfo.value}
              errors={personalInfoError.value}
              disabled={!IS_BROWSER}
            />
          )}
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
          {currentStep.value === 4 && (
            <Summary
              yearly={yearly.value}
              selectedPlan={selectedPlan.value}
              selectedAddons={selectedAddons.value}
              onClickChange={onClickChange}
              total={total.value}
            />
          )}
          {currentStep.value === 5 && <ThankYou />}
        </div>
      </section>
      <Actions
        onClickNext={onClickNext}
        onClickBack={onClickBack}
        currentStep={currentStep.value}
        onClickConfirm={onClickNext}
        isLoading={!IS_BROWSER}
      />
    </main>
  );
};

export default MultiStepForm;
