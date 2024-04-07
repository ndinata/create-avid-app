#!/usr/bin/env node
import { consola } from "consola";

import { cloneTemplate, setupProject } from "./setup.js";

(async () => {
  const projectName = process.argv[2];

  consola.box(`create-avid-app\nv${process.env.npm_package_version}`);

  if (!projectName) {
    consola.error(
      "Missing project name. Please provide one:\n\n  npx create-avid-app <project_name>",
    );
    process.exit(1);
  }

  consola.info(`Project name: ${projectName}`);

  await cloneTemplate(projectName);

  await setupProject(projectName);
})();
