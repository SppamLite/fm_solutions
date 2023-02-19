import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { JSX } from "preact";
/**
 * copied from https://codepen.io/Hyperplexed/pen/rNrJgrd
 * with some modification 😬
 */

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

type Props = JSX.HTMLAttributes<HTMLAnchorElement> & {
  toText: string;
  fromText: string;
};

const FancyAnchorTag = ({
  toText,
  fromText,
  ...rest
}: Props) => {
  const innerText = useSignal(fromText);
  const intervalRef = useRef<number | null>(null);

  const updateInnerText = (targetText: string) => () => {
    let iteration = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      innerText.value = targetText
        .split("")
        .map((_, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return LETTERS[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= targetText.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      iteration++;
    }, 20);
  };

  return (
    <a
      {...rest}
      onMouseOver={updateInnerText(toText)}
      onMouseLeave={updateInnerText(fromText)}
    >
      {innerText}
    </a>
  );
};

export default FancyAnchorTag;
