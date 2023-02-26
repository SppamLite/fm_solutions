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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/base.css" />
        <link rel="stylesheet" href={`/styles${route}/styles.css`} />
      </Head>
      <main>
        <h1 class="sr-only">QR Code Component</h1>
        <section>
          <div class="qr-code">
          </div>
          <div class="description">
            <h2>Improve your front-end skills by building projects</h2>
            <p>
              Scan the QR code to visit Frontend Mentor and take your coding
              skills to the next level
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
