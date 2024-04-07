import { consola } from "consola";

import { runCommand } from "./cmd.js";

const TEMPLATE_URL = "https://github.com/avid-sh/create-expo.git";
const TEMPLATE_RELEASE_URL =
  "https://api.github.com/repos/avid-sh/create-expo/releases/latest";

export async function cloneTemplate(projectName) {
  consola.start("Fetching latest starter template...");

  const repo = await (await fetch(TEMPLATE_RELEASE_URL)).json();
  const latestRelease = repo.tag_name || "main";

  consola.info(`Using starter template at ${latestRelease}`);

  await runCommand(
    `git clone -b ${latestRelease} --depth=1 ${TEMPLATE_URL} ${projectName}`,
    {
      loading: "Extracting starter template...",
      success: "Starter template extracted!",
      error: "Failed to extract starter template.",
    },
  );
}

export async function setupProject(projectName) {
  // TODO
}
