/*
 * This file serves as the client-facing proxy of `build-env.ts` to improve type
 * safety of consuming environment variables. This file should NOT be modified
 * unless you are changing how env vars are loaded and consumed.
 *
 * To add/modify an env var, follow the instructions in `build-env.ts`.
 *
 * To read an env var in the app, import `Env` from this file (NOT `build-env.ts`):
 * ```ts
 * import { Env } from "@/env";
 *
 * sayHelloTo(Env.GREETING);
 * ```
 */

import Constants from "expo-constants";

import type { EnvType } from "../build-env";

// @ts-ignore
export const Env: EnvType = Constants.expoConfig?.extra ?? {};
