/**
 * This file is where you define the schema for environment variables in env files.
 * NOTE: DO NOT import this file in the client (`src/`), use `src/env.ts` instead.
 *
 * To add/modify an env var:
 * 1. Add/modify the var name along with its expected type in `ENV_SCHEMA` below
 * 2. Add/modify the env var in all env files
 *
 * To read an env var:
 * - if using it in `app.config.ts` or other "config" files, import `Env` below
 * - if using it in the client (`src/`), import `Env` from `src/env.ts` instead
 *
 * To choose which env file to load vars from, set the `APP_ENV` env var to either
 * one of these values when running Expo CLI commands:
 * - "development", corresponding to `.env.development` (default if unspecified)
 * - "preview", corresponding to `.env.preview`
 * - "production", corresponding to `.env.production`
 * Check out `package.json` for scripts that help do this for you.
 *
 * NO SECRETS: NO encryption/obfuscation is applied to env vars used in the app.
 * They're all in plain text and should be assumed to be accessible to app users.
 * Keep this in mind as you design your API integrations.
 */

import { existsSync } from "fs";
import path from "path";

import dotenv from "dotenv";
import { z } from "zod";

enum Environment {
  Dev = "development",
  Preview = "preview",
  Prod = "production",
}

/** If `APP_ENV` is unspecified, the default is "development". */
const _APP_ENV = (process.env["APP_ENV"] as Environment) ?? Environment.Dev;

/**
 * --------------------------------------------------------------------------
 * ENV_SCHEMA
 *
 * If you're simply adding/changing env vars, this schema is the only thing in
 * this file that you'd need to change (don't forget to actually add/change the
 * env var in the env files!).
 * ------------------------------------------------------------------------ */

const ENV_SCHEMA = z.object({
  /** The environment the app is run in. ("development" | "preview" | "production") */
  APP_ENV: z.nativeEnum(Environment).default(_APP_ENV),

  GREETING: z.string(),
});

/**
 * --------------------------------------------------------------------------
 * Utility functions
 * ------------------------------------------------------------------------ */

/**
 * Loads environment variables from the env file corresponding to `APP_ENV` into
 * `process.env`.
 *
 * The target env file should have a name of `.env.${APP_ENV}` and be placed in
 * the root directory.
 *
 * You can skip calling this function if you have other means of loading env vars
 * into `process.env` (e.g. via your CI provider secrets).
 */
function _loadEnvVars() {
  const envfilePath = path.resolve(__dirname, `.env.${_APP_ENV}`);
  if (!existsSync(envfilePath)) {
    throw new Error(
      `Using the "${_APP_ENV}" environment but ".env.${_APP_ENV}" doesn't exist. Please create and populate it according to the schema in "build-env.ts".`,
    );
  }

  dotenv.config({ path: envfilePath });
}

/**
 * Returns parsed environment variables from `process.env`.
 */
function _parseProcessEnv() {
  const parsed = ENV_SCHEMA.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables in ".env.${_APP_ENV}":\n${JSON.stringify(parsed.error.flatten().fieldErrors)}\nRefer to the schema in "build-env.ts" to load them correctly.`,
    );
  }

  return parsed.data;
}

_loadEnvVars();

/**
 * NOTE: this `Env` is not safe to import _directly_ in the client (`src/`).
 * To use env vars in the client, import from `src/env.ts` instead.
 */
export const Env = _parseProcessEnv();

export type EnvType = typeof Env;
