import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

const PRESERVED_FILE_NAMES = ["api", "index.tsx", "[name].tsx"];

const loadSolutions = async (): Promise<string[]> => {
  const __dirname = new URL(".", import.meta.url);
  const promises = [];
  for await (const dirEntry of Deno.readDir(__dirname)) {
    const folderName = dirEntry.name;
    if (PRESERVED_FILE_NAMES.includes(folderName)) {
      continue;
    }
    promises.push(dirEntry.name);
  }
  return await Promise.all(promises) as string[];
};

export const handler: Handlers<string[]> = {
  async GET(_req, ctx) {
    const solutions = await loadSolutions();
    return ctx.render(solutions);
  },
};

export default function Home({ data: solutions }: PageProps<string[]>) {
  return (
    <>
      <Head>
        <title>Frontend Mentor Challenges Solutions | Connor Z</title>
      </Head>
      <div>
        <a
          href="https://www.frontendmentor.io/profile/SppamLite"
          target="_blank"
        >
          Frontend Mentor
        </a>{" "}
        challenges solutions:
        <ul>
          {solutions.map((solution) => (
            <li>
              <a href={`/${solution}`}>{solution}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
