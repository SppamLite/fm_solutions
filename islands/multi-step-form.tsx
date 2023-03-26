import { JSX } from "preact";
import { ZodError } from "zod";
import { computed, effect, useSignal } from "@preact/signals";

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
  initError,
  PersonalInfo,
  PersonalInfoError,
  schema,
} from "../components/multi-step-form/personal-info.ts";

type ChangeHandler = JSX.GenericEventHandler<HTMLInputElement>;

const MultiStepForm = () => {
  // signals
  const currentStep = useSignal<number>(1);
  const yearly = useSignal<boolean>(false);
  const selectedPlan = useSignal<Plan>("Arcade");
  const selectedAddons = useSignal<AddOn[]>([]);
  const personalInfo = useSignal<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const personalInfoError = useSignal<PersonalInfoError>(initError);

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
  const onNav = (step: number) => currentStep.value = step;
  const onClickBack = () => currentStep.value -= 1;
  const onClickChange = () => currentStep.value = 2;
  const onClickConfirm = () => console.log("confirm");

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

  const onClickNext = () => {
    if (currentStep.value !== 1) {
      currentStep.value += 1;
    }
    try {
      schema.parse(personalInfo.value);
      currentStep.value += 1;
    } catch (error) {
      if (error instanceof ZodError<PersonalInfo>) {
        const validationError = error.issues.reduce(
          (acc: PersonalInfoError, issue) => {
            const issuePath = issue.path.join();
            acc[issuePath] = issue.message;
            return acc;
          },
          initError,
        );
        personalInfoError.value = {
          ...personalInfoError.value,
          ...validationError,
        };
      } else {
        console.error("unknown error at step 1", error);
      }
    }
  };

  return (
    <main class="animation-in">
      <StepNav onNav={onNav} currentStep={currentStep.value} />
      <section class="steps">
        <div class="steps__container">
          {currentStep.value === 1 && (
            <PersonalInfoForm
              onInputChange={onInputChange}
              personalInfo={personalInfo.value}
              errors={personalInfoError.value}
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
