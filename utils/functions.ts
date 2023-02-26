const PRESERVED_FILE_NAMES = ["api", "index.tsx", "[name].tsx"];

export const loadSolutions = async (): Promise<string[]> => {
  const __dirname = new URL("../routes", import.meta.url);
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
