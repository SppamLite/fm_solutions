import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";

const Home = ({ route }: PageProps) => {
  return (
    <>
      <Head>
        <title>QR Code Component {pageHeaderSuffix}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/base.css" />
        <link rel="stylesheet" href={`/styles${route}/styles.css`} />
      </Head>
      <main>
        qr code component
      </main>
    </>
  );
};

export default Home;
