import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";

const Home = ({ route }: PageProps) => (
  <>
    <Head>
      <title>Order Summary Component {pageHeaderSuffix}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/base.css" />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
    </Head>
    <main>
      <section>
        <h1 class="sr-only">Order Summary Component</h1>
        <div class="hero flex">
          <img
            src={`/images${route}/illustration-hero.svg`}
            alt="illustration hero"
          />
        </div>
        <div class="container">
          <h2>Order Summary</h2>
          <p>
            You can now listen to millions of songs, audiobooks, and podcasts on
            any device anywhere you like!
          </p>
          <div class="summary flex items-center justify-between">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                <g fill="none" fill-rule="evenodd">
                  <circle cx="24" cy="24" r="24" fill="#DFE6FB" />
                  <path
                    fill="#717FA6"
                    fill-rule="nonzero"
                    d="M32.574 15.198a.81.81 0 00-.646-.19L20.581 16.63a.81.81 0 00-.696.803V26.934a3.232 3.232 0 00-1.632-.44A3.257 3.257 0 0015 29.747 3.257 3.257 0 0018.253 33a3.257 3.257 0 003.253-3.253v-8.37l9.726-1.39v5.327a3.232 3.232 0 00-1.631-.441 3.257 3.257 0 00-3.254 3.253 3.257 3.257 0 003.254 3.253 3.257 3.257 0 003.253-3.253V15.81a.81.81 0 00-.28-.613z"
                  />
                </g>
              </svg>
              <div class="flex flex-col plan-price">
                <span class="plan-price__plan">Annual Plan</span>
                <span class="plan-price__price">$59.99/year</span>
              </div>
            </div>
            <button type="button" class="btn btn-change">Change</button>
          </div>
          <div class="actions flex flex-col items-center">
            <button type="button" class="btn btn-process flex items-center justify-center">
              Proceed to Payment
            </button>
            <button type="button" class="btn btn-cancel">Cancel Order</button>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default Home;
