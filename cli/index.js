#!/usr/bin/env node

createAvidApp();

function createAvidApp() {
  const projectName = process.argv[2];

  console.log("create-avid-app.\n");

  if (!projectName) {
    console.error("error: missing project name\n");
    console.error("Please provide a name for your project:");
    console.error("npx create-avid-app <project_name>");
    process.exit(1);
  }

  console.log(`project name: ${projectName}`);
}
