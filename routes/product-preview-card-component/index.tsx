import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";

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
        <div class="preview-card">
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

            <button type="button">
              <svg width="15" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.383 10.388a2.397 2.397 0 0 0-1.518-2.222l1.494-5.593a.8.8 0 0 0-.144-.695.8.8 0 0 0-.631-.28H2.637L2.373.591A.8.8 0 0 0 1.598 0H0v1.598h.983l1.982 7.4a.8.8 0 0 0 .799.59h8.222a.8.8 0 0 1 0 1.599H1.598a.8.8 0 1 0 0 1.598h.943a2.397 2.397 0 1 0 4.507 0h1.885a2.397 2.397 0 1 0 4.331-.376 2.397 2.397 0 0 0 1.12-2.021ZM11.26 7.99H4.395L3.068 3.196h9.477L11.26 7.991Zm-6.465 6.392a.8.8 0 1 1 0-1.598.8.8 0 0 1 0 1.598Zm6.393 0a.8.8 0 1 1 0-1.598.8.8 0 0 1 0 1.598Z"
                  fill="#FFF"
                />
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
