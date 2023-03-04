import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";

const Home = ({ route }: PageProps) => (
  <>
    <Head>
      <title>NFT Preview Card Component {pageHeaderSuffix}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/base.css" />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
    </Head>
    <main>
      <h1 class="sr-only">NFT Preview Card Component</h1>
      <section>
        <div class="equilibrium">
          <img
            src={`/images${route}/image-equilibrium.jpg`}
            alt="equilibrium"
          />
        </div>
        <h2>Equilibrium #3429</h2>
        <h3>Our Equilibrium collection promotes balance and calm.</h3>
        <h4 class="flex justify-between items-center">
          <span class="t-bold t-cyan inline-flex items-center gas">
            <svg width="11" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z"
                fill="#00FFF8"
              />
            </svg>
            <span>0.041 ETH</span>
          </span>
          <span class="inline-flex items-center t-soft-blue timeleft">
            <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z"
                fill="#8BACD9"
              />
            </svg>
            <span>3 days left</span>
          </span>
        </h4>
        <div class="profile flex items-center">
          <div class="profile__avatar-container inline-flex">
            <img
              src={`/images${route}/image-avatar.png`}
              width="32"
              alt="profile avatar"
            />
          </div>
          <h4>
            <span class="t-soft-blue">Creation of</span>
            <span class="name">Jules Wyvern</span>
          </h4>
        </div>
      </section>
    </main>
  </>
);

export default Home;
