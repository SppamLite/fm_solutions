type Props = {
  currentStep: number;
  onClickBack(): void;
  onClickNext(): void;
  onClickConfirm(): void;
};

export const Actions = ({
  currentStep,
  onClickBack,
  onClickNext,
  onClickConfirm,
}: Props) => (
  <section class="actions">
    <div class="actions__container flex items-center">
      {currentStep !== 1 && (
        <button
          type="button"
          class="back-btn t-gray"
          onClick={onClickBack}
        >
          Go Back
        </button>
      )}
      {currentStep < 4 && (
        <button
          class="next-btn inline-flex items-center justify-center t-white"
          type="button"
          onClick={onClickNext}
        >
          Next Step
        </button>
      )}
      {currentStep === 4 && (
        <button
          class="confirm-btn inline-flex items-center justify-center t-white"
          type="button"
          onClick={onClickConfirm}
        >
          Confirm
        </button>
      )}
    </div>
  </section>
);