import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import QrCodeGenerator from "../../islands/qr-code-generator.tsx";
import { pageHeaderSuffix } from "../../utils/constants.ts";
import { loadSolutions } from "../../utils/functions.ts";

export const handler: Handlers<string[]> = {
  async GET({ url }, ctx) {
    const { hostname } = new URL(url);
    const solutions = await loadSolutions();
    const urls = [
      "https://www.frontendmentor.io/",
      ...solutions.map((s) => `${hostname}/${s}`),
    ];
    return ctx.render(urls);
  },
};

const Home = ({ route, data }: PageProps<string[]>) => {
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
        <section class="animation-in">
          <div class="qr-code">
            <QrCodeGenerator urls={data} />
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
