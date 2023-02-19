import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";
import { nanoid } from "nanoid/mod.ts";

type Stat = {
  category: string;
  score: number;
  icon: string;
  color: string;
};

export const handler: Handlers<Stat[]> = {
  async GET(_req, ctx) {
    const filepath = new URL("./data.json", import.meta.url);
    const data = await Deno.readTextFile(filepath);
    if (!data) {
      return new Response("Data not found", { status: 404 });
    }
    try {
      const stats = JSON.parse(data) as Stat[];
      return ctx.render(stats);
    } catch (error) {
      return new Response("Data parse error", { status: 500 });
    }
  },
};

const Home = ({ route, data: stats }: PageProps<Stat[]>) => {
  // calculating the overall score
  // some mathematics here 😈
  const score = Math.round(
    stats.reduce((acc, { score }) => acc += score, 0) / stats.length,
  );

  return (
    <>
      <Head>
        <title>Results Ssummary Component {pageHeaderSuffix}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/base.css" />
        <link rel="stylesheet" href={`/styles${route}/styles.css`} />
      </Head>
      <main class="animation-in">
        <h1 class="sr-only">Results Ssummary Component</h1>
        <div class="score">
          <h2 class="t-light-blue score__heading">Your Result</h2>
          <div class="score__display">
            <span class="t-white score__display__number">{score}</span>
            <p class="t-light-blue t-bold t-opacity-50">of 100</p>
          </div>
          <div class="score__detail">
            <h3 class="t-white score__detail__heading">Great</h3>
            <p class="t-light-blue">
              You scored higher than 65% of the people who have taken these
              tests.
            </p>
          </div>
        </div>
        <div class="summary">
          <h4 class="t-navy">Summary</h4>
          <div class="stats">
            {stats.map(({ category, color, score, icon }) => (
              <div class={`stat__item ${color}`} key={nanoid()}>
                <div class="stat__item__category">
                  <img src={icon} alt="Category icon" />
                  <p>{category}</p>
                </div>
                <div class="stat__item__score">
                  <p class="t-navy t-bold">{score}</p>
                  <p class="t-navy t-bold t-opacity-50">/ 100</p>
                </div>
              </div>
            ))}
          </div>
          <button type="button">Continue</button>
        </div>
      </main>
    </>
  );
};

export default Home;
