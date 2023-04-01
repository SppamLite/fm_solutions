const PRESERVED_FILE_NAMES = ["api", "index.tsx", "[name].tsx"];

type FMSolution = {
  id: string;
  title: string;
  screenshot: string;
  liveURL: string;
};

export type HomeData = {
  isBackup: boolean;
  solutions: FMSolution[];
  backupSolutions: string[];
};

export const loadLocalSolutions = async (): Promise<string[]> => {
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

export const loadFMSolutions = async (): Promise<FMSolution[] | null> => {
  const resp = await fetch(
    `https://backend.frontendmentor.io/rest/v2/users/634e0a24cdc01feb4da9c834/solutions`,
  );
  if (resp.status !== 200) {
    return null;
  }
  const respData = await resp.json();
  if (!respData.data) return null;
  const solutions: FMSolution[] = respData.data;
  return solutions;
};
