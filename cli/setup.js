import { readFile, rm, writeFile } from "node:fs/promises";
import path from "path";

import { consola } from "consola";

import { runCommand } from "./cmd.js";

const TEMPLATE_URL = "https://github.com/ndinata/create-avid-app.git";
const TEMPLATE_RELEASE_URL =
  "https://api.github.com/repos/ndinata/create-avid-app/releases/latest";

export async function cloneTemplate(projectName) {
  consola.start("Fetching latest starter template...");

  const repo = await (await fetch(TEMPLATE_RELEASE_URL)).json();
  const latestRelease = repo.tag_name || "main";

  consola.ready(`Using starter template at ${latestRelease}\n`);

  await runCommand(
    `git clone -b ${latestRelease} --depth=1 ${TEMPLATE_URL} ${projectName}`,
    {
      loading: "Cloning starter template...",
      success: "Starter template cloned!\n",
      error: "Failed to clone starter template.",
    },
  );
}

export async function setupProject(projectName) {
  await removeFiles(projectName);
  await initRepo(projectName);
  await updateConfig(projectName);
  await installDeps(projectName);
}

async function removeFiles(projectName) {
  try {
    return Promise.all(
      [".git", "cli", "license"].map((name) =>
        rm(path.join(process.cwd(), `${projectName}/${name}`), {
          recursive: true,
        }),
      ),
    );
  } catch (err) {
    consola.error(`Failed to remove unneeded files from the template.\n${err}`);
    process.exit(1);
  }
}

async function initRepo(projectName) {
  await runCommand(`cd ${projectName} && git init && cd ..`, {
    error: "Failed to init project git repo.",
  });
}

async function updateConfig(projectName) {
  // Update `name` field in `package.json`
  try {
    const projectPackageJsonPath = path.join(
      process.cwd(),
      `${projectName}/package.json`,
    );

    const projectPackageJson = JSON.parse(
      await readFile(projectPackageJsonPath, {
        encoding: "utf8",
      }),
    );
    projectPackageJson.name = projectName.toLowerCase();

    await writeFile(
      projectPackageJsonPath,
      JSON.stringify(projectPackageJson, null, 2),
      "utf8",
    );
  } catch (err) {
    consola.error(`Failed to update project "package.json".\n${err}`);
    process.exit(1);
  }

  // Update project name and slug in `app.config.ts`
  try {
    const projectAppConfigPath = path.join(
      process.cwd(),
      `${projectName}/app.config.ts`,
    );
    const contents = await readFile(projectAppConfigPath, { encoding: "utf8" });
    const replaced = contents.replace(/avid/gi, projectName);
    await writeFile(projectAppConfigPath, replaced);
  } catch (err) {
    consola.error(`Failed to update project "app.config.ts".\n${err}`);
    process.exit(1);
  }
}

async function installDeps(projectName) {
  await runCommand(`cd ${projectName} && pnpm install`, {
    loading: "Installing dependencies...",
    success: "Dependencies installed!\n",
    error: "Failed to install dependencies.",
  });
}
