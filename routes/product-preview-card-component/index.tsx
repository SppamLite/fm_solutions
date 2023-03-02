import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";
import CartButton from "../../islands/product-preview-cart-button.tsx";

const Home = ({ route }: PageProps) => (
  <>
    <Head>
      <title>Product Preview Card Component {pageHeaderSuffix}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Montserrat:wght@500;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/base.css" />
      <link rel="stylesheet" href={`/styles${route}/styles.css`} />
    </Head>
    <main>
      <h1 class="sr-only">Product Preview Card Component</h1>
      <div class="preview-card animation-in">
        <picture>
          <source
            srcset={`/images${route}/image-product-desktop.jpg`}
            media="(min-width: 640px)"
          />
          <img
            src={`/images${route}/image-product-mobile.jpg`}
            alt="perfume"
          />
        </picture>
        <div class="preview-card__content">
          <span class="sans t-gray product-tag">PERFUME</span>
          <h2 class="serif t-black">Gabrielle Essence Eau De Parfum</h2>
          <p class="sans t-gray">
            A floral, solar and voluptuous interpretation composed by Olivier
            Polge, Perfumer-Creator for the House of CHANEL.
          </p>
          <div class="preview-card__content__price-tag">
            <h3 class="serif t-green">$149.99</h3>
            <h4 class="sans t-gray line-through">$169.99</h4>
          </div>
          <CartButton />
        </div>
      </div>
    </main>
  </>
);

export default Home;
