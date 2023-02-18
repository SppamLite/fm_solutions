import { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

const ratingValues = Array.from({ length: 5 }, (_, index) => `${index + 1}`);

const InteractiveRatingForm = () => {
  const [rating, setRating] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onSubmit = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    if (!rating) {
      setShowAlert(true);
      event.preventDefault();
      return;
    }
  };

  const onRatingChange = useCallback((
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    if (showAlert) {
      setShowAlert(false);
    }
    setRating(event.currentTarget.value);
  }, [showAlert]);

  useEffect(() => {
    if (!showAlert) {
      return;
    }
    const timer = setTimeout(() => setShowAlert(false), 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div>
      <div class="icon-container flex-center">
        <svg width="17" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m9.067.43 1.99 4.031c.112.228.33.386.58.422l4.45.647a.772.772 0 0 1 .427 1.316l-3.22 3.138a.773.773 0 0 0-.222.683l.76 4.431a.772.772 0 0 1-1.12.813l-3.98-2.092a.773.773 0 0 0-.718 0l-3.98 2.092a.772.772 0 0 1-1.119-.813l.76-4.431a.77.77 0 0 0-.222-.683L.233 6.846A.772.772 0 0 1 .661 5.53l4.449-.647a.772.772 0 0 0 .58-.422L7.68.43a.774.774 0 0 1 1.387 0Z"
            fill="#FC7614"
          />
        </svg>
      </div>
      <h2 class="rating-heading t-white">How did we do?</h2>
      <p class="t-light-gray">
        Please let us know how we did with your support request. All feedback is
        appreciated to help us improve our offering!
      </p>
      <form method="post" action="/api/interactive-rating" onSubmit={onSubmit}>
        <div class="rating-items">
          {ratingValues.map((ratingValue) => (
            <div key={ratingValue} class="rating-item">
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                id={`rating_${ratingValue}`}
                onChange={onRatingChange}
              />
              <label for={`rating_${ratingValue}`}>{ratingValue}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          class={showAlert ? "horizontal-shake invalid" : ""}
        >
          {showAlert ? "Please Rate 🙅‍" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InteractiveRatingForm;
