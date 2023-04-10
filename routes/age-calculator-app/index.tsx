import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import AgeCalculator from "../../islands/age-calculator.tsx";
import { pageHeaderSuffix } from "../../utils/constants.ts";

const Home = ({ route }: PageProps) => (
  <>
    <Head>
      <title>Age Calculator App {pageHeaderSuffix}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,700;1,400;1,800&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/base.css" />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
      <script type="module" src={`/scripts${route}/rolling-number.js`}></script>
    </Head>
    <main>
      <h1 class="sr-only">Age Calculator App</h1>
      <AgeCalculator defaultDay={24} defaultMonth={9} defaultYear={1984} />
    </main>
  </>
);

export default Home;
