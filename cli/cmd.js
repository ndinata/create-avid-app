import { exec } from "child_process";

import { consola } from "consola";

export async function runCommand(cmd, { loading, success, error }) {
  !!loading && consola.start(loading);
  try {
    await execCommand(cmd);
    !!success && consola.success(success);
  } catch (err) {
    consola.error(`${error}\n${err}`);
    process.exit(1);
  }
}

async function execCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve(stdout || stderr);
    });
  });
}
