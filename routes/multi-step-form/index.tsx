import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import MultiStepForm from "../../islands/multi-step-form.tsx";
import { pageHeaderSuffix } from "../../utils/constants.ts";

const Home = ({ route }: PageProps) => (
  <>
    <Head>
      <title>Multi Step Form {pageHeaderSuffix}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/base.css" />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
    </Head>
    <MultiStepForm />
  </>
);

export default Home;
