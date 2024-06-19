#!/usr/bin/env node
import { consola } from "consola";

import { cloneTemplate, setupProject } from "./setup.js";

(async () => {
  const projectName = process.argv[2];

  consola.box(`create-avid-app`);

  if (!projectName) {
    consola.error(
      "Missing project name. Please provide one:\n\n  npx create-avid-app <project_name>",
    );
    process.exit(1);
  }

  consola.info(`Project name: ${projectName}\n`);

  await cloneTemplate(projectName);

  await setupProject(projectName);

  consola.box(`Your project is now available! 🚀

Run instructions for Android:
$ cd ${projectName} && pnpm android

Run instructions for iOS:
$ cd ${projectName} && pnpm ios
`);
})();
