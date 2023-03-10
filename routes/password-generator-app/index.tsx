import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import PasswordGenerator from "../../islands/password-generator.tsx";
import { pageHeaderSuffix } from "../../utils/constants.ts";

const Home = ({ route }: PageProps) => (
  <>
    <Head>
      <title>Password Generator App {pageHeaderSuffix}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/base.css" />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
      {/* don't write your own range slider css, generate it from https://toughengineer.github.io/demo/slider-styler */}
      <link rel="stylesheet" href={`/styles${route}/range-input.css`} />
    </Head>
    <main>
      <h1 class="sr-only">Password Generator</h1>
      <div class="container">
        <h2 class="t-gray heading">Password Generator</h2>
        <PasswordGenerator />
      </div>
    </main>
  </>
);

export default Home;
