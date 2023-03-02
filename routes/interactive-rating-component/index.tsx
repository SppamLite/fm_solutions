import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import FancyAnchorTag from "../../islands/fancy-anchor-tag.tsx";
import InteractiveRatingForm from "../../islands/interactive-rating-form.tsx";
import { pageHeaderSuffix } from "../../utils/constants.ts";

type Data = {
  rating: string;
};

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render({ rating: cookies.rating });
  },
};

const RatingResult = ({ rating, route }: { rating: string; route: string }) => (
  <div class="rating-result">
    <img src={`/images${route}/illustration-thank-you.svg`} alt="Thank you" />
    <FancyAnchorTag
      toText="reset rating"
      fromText={`You selected ${rating} out of 5`}
      href={`${route}/reset-rating`}
      class="rating-result__link"
    />
    <div class="rating-result__body">
      <h2 class="t-white">Thank you!</h2>
      <p class="t-light-gray">
        Click the button where it says "You selected x out of 5" to re-rate 😁.
      </p>
    </div>
  </div>
);

const Home = ({ route, data: { rating } }: PageProps<Data>) => (
  <>
    <Head>
      <title>Interactive Rating Component {pageHeaderSuffix}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://esm.sh/react-tooltip@5.8.1/dist/react-tooltip.css"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="/styles/base.css" />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
    </Head>
    <main class="animation-in">
      <h1 class="sr-only">Interactive Rating Component</h1>
      <div class="container">
        {!rating
          ? <InteractiveRatingForm />
          : <RatingResult rating={rating} route={route} />}
      </div>
    </main>
  </>
);

export default Home;
