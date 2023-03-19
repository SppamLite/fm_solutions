type Props = {
  onNav(step: number): void;
};
export const StepNav = ({ onNav }: Props) => {
  const onClick = (step: number) => () => onNav(step);
  return (
    <nav class="step-nav">
      <div class="step-nav__container flex">
        <button
          class="nav-btn inline-flex items-center justify-center"
          type="button"
          onClick={onClick(1)}
        >
          1
        </button>
        <button
          class="nav-btn inline-flex items-center justify-center"
          type="button"
          onClick={onClick(2)}
        >
          2
        </button>
        <button
          class="nav-btn inline-flex items-center justify-center"
          type="button"
          onClick={onClick(3)}
        >
          3
        </button>
        <button
          class="nav-btn inline-flex items-center justify-center"
          type="button"
          onClick={onClick(4)}
        >
          4
        </button>
      </div>
    </nav>
  );
};
