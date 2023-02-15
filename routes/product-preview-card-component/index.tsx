import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { pageHeaderSuffix } from "../../utils/constants.ts";

export default function Home({ route }: PageProps) {
  return (
    <>
      <Head>
        <title>Product preview card component {pageHeaderSuffix}</title>
        <link rel="stylesheet" href={`/styles/base.css`} />
        <link rel="stylesheet" href={`/styles${route}/styles.css`} />
      </Head>
      <main>
        <h3>PERFUME</h3>
        <h2>Gabrielle Essence Eau De Parfum</h2>
        <p>
          A floral, solar and voluptuous interpretation composed by Olivier
          Polge, Perfumer-Creator for the House of CHANEL.
        </p>
        <h4>$149.99</h4>
        <h5>$169.99</h5>
        <button type="button">Add to Cart</button>
      </main>
    </>
  );
}
