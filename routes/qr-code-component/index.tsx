import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import QrCodeGenerator from "../../islands/qr-code-generator.tsx";
import { pageHeaderSuffix } from "../../utils/constants.ts";
import { loadLocalSolutions } from "../../utils/home-functions.ts";

type Data = {
  urls: string[];
  query: string;
};

export const handler: Handlers<Data> = {
  async GET({ url }, ctx) {
    const { hostname, searchParams } = new URL(url);
    const query = searchParams.get("qr") || "";
    const solutions = await loadLocalSolutions();
    const urls = [
      "https://www.frontendmentor.io/",
      ...solutions.map((s) => `https://${hostname}/${s}`),
    ];
    return ctx.render({ urls, query });
  },
};

const Home = ({ route, data }: PageProps<Data>) => {
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
            <QrCodeGenerator urls={data.urls} query={data.query} />
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
