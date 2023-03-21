import { useSignal } from "@preact/signals";
import { PersonalInfoForm } from "../components/multi-step-form/personal-info-form.tsx";
import { PlanForm } from "../components/multi-step-form/plan-form.tsx";
import { AddOnsForm } from "../components/multi-step-form/add-ons-form.tsx";
import { StepNav } from "../components/multi-step-form/step-nav.tsx";

const MultiStepForm = () => {
  const currentStep = useSignal<number>(1);
  const onNav = (step: number) => currentStep.value = step;
  const onClickNext = () => currentStep.value += 1;
  const onClickBack = () => currentStep.value -= 1;

  return (
    <main>
      <StepNav onNav={onNav} currentStep={currentStep.value} />
      <section class="steps">
        <div class="steps__container">
          <PersonalInfoForm />
          <PlanForm />
          <AddOnsForm />
          <div>Summary</div>
          <div>Thank you!</div>
        </div>
      </section>
      <section class="actions">
        <div class="actions__container flex items-center">
          {currentStep.value !== 1 && (
            <button
              type="button"
              class="back-btn t-gray animation-in"
              onClick={onClickBack}
            >
              Go Back
            </button>
          )}
          {currentStep.value < 4 && (
            <button
              class="next-btn inline-flex items-center justify-center t-white"
              type="button"
              onClick={onClickNext}
            >
              Next Step
            </button>
          )}
          {currentStep.value === 4 && (
            <button
              class="confirm-btn inline-flex items-center justify-center t-white"
              type="button"
            >
              Confirm
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default MultiStepForm;
