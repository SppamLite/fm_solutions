import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";
import CartButton from "../../islands/product-preview-cart-button.tsx";

export default function Home({ route }: PageProps) {
  return (
    <>
      <Head>
        <title>Product preview card component {pageHeaderSuffix}</title>
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
        <link rel="stylesheet" href={`/styles/base.css`} />
        <link rel="stylesheet" href={`/styles${route}/styles.css`} />
      </Head>
      <main>
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
            <h3 class="sans t-gray">PERFUME</h3>
            <h2 class="serif t-black">Gabrielle Essence Eau De Parfum</h2>
            <p class="sans t-gray">
              A floral, solar and voluptuous interpretation composed by Olivier
              Polge, Perfumer-Creator for the House of CHANEL.
            </p>
            <div class="preview-card__content__price-tag">
              <h4 class="serif t-green">$149.99</h4>
              <h5 class="sans t-gray line-through">$169.99</h5>
            </div>
            <CartButton />
          </div>
        </div>
      </main>
    </>
  );
}
