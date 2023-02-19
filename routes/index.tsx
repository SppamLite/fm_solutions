import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/base.css" />
        <link rel="stylesheet" href="/styles/home.css" />
        <script
          src="https://kit.fontawesome.com/b507bcc926.js"
          crossOrigin="anonymous"
        >
        </script>
      </Head>
      <main>
        <h2>👋 你好~</h2>
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
          <div>
            <a href="https://github.com/SppamLite/fm_solutions" target="_blank">
              All source code on 👉
              <i class="fa-brands fa-square-github"></i>
            </a>
          </div>
          <p>More projects coming soon...</p>
        </div>
      </main>
    </>
  );
}
