import { useSignal } from "@preact/signals";
import { PersonalInfoForm } from "../components/multi-step-form/personal-info-form.tsx";
import { PlanForm } from "../components/multi-step-form/plan-form.tsx";
import { AddOnsForm } from "../components/multi-step-form/add-ons-form.tsx";
import { StepNav } from "../components/multi-step-form/step-nav.tsx";

const MultiStepForm = () => {
  const step = useSignal<number>(1);
  const onNav = (step: number) => console.log("nav", step);

  return (
    <main>
      <StepNav onNav={onNav} />
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
        <div class="actions__container">
          {step.value !== 1 && <button>Go Back</button>}
          <button class="next-btn">Next Step</button>
        </div>
      </section>
    </main>
  );
};

export default MultiStepForm;
