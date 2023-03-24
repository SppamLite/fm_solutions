import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { PersonalInfoForm } from "../components/multi-step-form/personal-info-form.tsx";
import { PlanForm } from "../components/multi-step-form/plan-form.tsx";
import { AddOnsForm } from "../components/multi-step-form/add-ons-form.tsx";
import { StepNav } from "../components/multi-step-form/step-nav.tsx";
import { Actions } from "../components/multi-step-form/actions.tsx";

const MultiStepForm = () => {
  const currentStep = useSignal<number>(1);
  const yearly = useSignal<boolean>(false);
  const onNav = (step: number) => currentStep.value = step;
  const onClickNext = () => currentStep.value += 1;
  const onClickBack = () => currentStep.value -= 1;
  const onClickConfirm = () => console.log("confirm");

  const onChange: JSX.GenericEventHandler<HTMLInputElement> = (
    { currentTarget },
  ) => yearly.value = currentTarget.checked;

  return (
    <main class="animation-in">
      <StepNav onNav={onNav} currentStep={currentStep.value} />
      <section class="steps">
        <div class="steps__container">
          {currentStep.value === 1 && <PersonalInfoForm />}
          {currentStep.value === 2 && (
            <PlanForm onCycleChange={onChange} yearly={yearly.value} />
          )}
          {currentStep.value === 3 && <AddOnsForm />}
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
