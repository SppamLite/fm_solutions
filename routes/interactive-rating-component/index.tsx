import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
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

const RateResult = ({ rating }: { rating: string }) => (
  <div>
    <h5>You selected {rating} out of 5</h5>
    <h2>Thank you!</h2>
    <p>
      We appreciate you taking the time to give a rating. If you ever need more
      support, don’t hesitate to get in touch!
    </p>
  </div>
);

const Home = ({ route, data: { rating } }: PageProps<Data>) => (
  <>
    <Head>
      <title>Interactive Rating Component {pageHeaderSuffix}</title>
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
      <link rel="stylesheet" href={`/styles/base.css`} />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
    </Head>
    <main class="animation-in">
      <h1 class="sr-only">Interactive Rating Component</h1>
      <div class="container">
        {!rating ? <InteractiveRatingForm /> : <RateResult rating={rating} />}
      </div>
    </main>
  </>
);

export default Home;
