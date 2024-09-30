# create-avid-app

> Yet another starter template for Expo (React Native) projects!


## Usage
1. Install [`pnpm`](https://pnpm.io) if you haven't.
```sh
$ npm install -g pnpm
```

2. Create your project using the template.
```sh
# will always clone the latest version of the template
$ pnpm create avid-app@latest <your_project_name>
```


## Configuration
These packages are included out of the box:
- ESLint, Prettier, TypeScript
- [`react-navigation v6`](https://reactnavigation.org) (this template doesn't use `expo-router`)
- [`react-native-svg`](https://github.com/kristerkari/react-native-svg-transformer)
- [`react-query`](https://tanstack.com/query/latest/docs/framework/react/installation) (basic setup)
- [`husky`](https://github.com/typicode/husky) (runs a check on [`pre-push`](./.husky/pre-push) by default)
- [`tabler-icons`](https://tabler.io/icons) and [`twrnc`](https://github.com/jaredh159/tailwind-react-native-classnames)
    (read more on styling [below](#styling))
- [`zod`](https://zod.dev) for validating `.env` schema (read more on env management [below](#env-management))

### Styling
This template uses [`twrnc`]((https://github.com/jaredh159/tailwind-react-native-classnames))
(a performant TailwindCSS-based library) for styling and supports dark mode by default
(responding to the device's theme preference).

Instead of creating stylesheets, you style components inline like this:
```tsx
import { Text, View } from "react-native";
import { tw } from "@/theme";

function Card({ disabled }: { disabled: boolean }) {
  return (
    <View
      style={tw.style("p-6 bg-background dark:bg-background-dark", {
        "opacity-50": disabled,
      })}
    >
      <Text
        style={tw`font-semibold text-primary-foreground dark:text-primary-foreground-dark`}
      >
        Hello
      </Text>
    </View>
  );
}
```

> [!TIP]
> This template also includes the [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
> to sort Tailwind classes based on the recommended order.

This has several benefits:
- not having to think of unique names for each and every component style (speeding up UI prototyping)
- if you already use Tailwind in your web project, you can reuse your existing `tailwind.config.js` (check out this template's [`tw` config file](./tailwind.config.js))
- supporting dark mode is now as simple as using the `dark:` modifier (e.g. `bg-white dark:bg-black`) in your component styles
- adapting different styles for Android and iOS is as simple as using the `android:` and `ios:` modifiers respectively

Several potential downsides:
- you now have to be familiar with Tailwind classes if you weren't previously
- not every Tailwind class is supported — check out the [library's docs](https://github.com/jaredh159/tailwind-react-native-classnames) for more info
- styles can be quite long and ugly (spanning across lines)

### Env management

Env variables are validated with `zod` at build time to ensure consistent/correct
values. Unlike [Expo's default mechanism](https://docs.expo.dev/guides/environment-variables/)
to set and read env variables (which this template doesn't use), the variables
you define don't need to be preprended with `EXPO_PUBLIC` (although you should
still **assume that they're accessible by your users!**).

#### Adding an env variable

1. Add the key-value pair to any/all of these env files:
- `.env.development`
- `.env.preview`
- `.env.production`

```sh
# .env.development
YOUR_BASE_URL="https://yoursite.com"
```

2. Add the key name to the `zod` schema in [`build-env.ts`](./build-env.ts).

```ts
// build-env.ts
const ENV_SCHEMA = z.object({
  YOUR_BASE_URL: z.string(),

  // your other keys...
});
```

This file is where you set the schema of your env variables. It has detailed comments
explaining what it does—feel free to go through them. During builds, this file loads
env variables and parses them, throwing a build error if the values don't match the
defined schema.

3. Import `Env` from `@/env` in your screens/components to consume the env variable.

```ts
import { Env } from "@/env";

async function getUsers(): Promise<User> {
  // `YOUR_BASE_URL` will be typechecked if you define it as part of the schema
  // in `build-env.ts`.
  const res = await fetch(`${Env.YOUR_BASE_URL}/api/users`);
  return res.json();
}
```

#### Removing an env variable
Remove the env variable from both the env file (e.g. `.env.development`) **and**
the schema in `build-env.ts`.

#### Activating specific environments
To choose which environment to load variables from, set the `APP_ENV` env variable
to either one of: `development (default if unspecified) | preview | production`.
`pnpm` scripts have been added to help simplify this.

```jsonc
// package.json
{
  "scripts": {
    // These 3 scripts run the `Debug` configuration.
    // If `APP_ENV` isn't specified, it's `development` by default.
    "ios": "EXPO_NO_DOTENV=1 expo run:ios",
    "ios:preview": "APP_ENV=preview pnpm ios",
    "ios:prod": "APP_ENV=production pnpm ios",

    // These 3 scripts run the `Release` configuration.
    "ios:release": "EXPO_NO_DOTENV=1 expo run:ios --configuration Release",
    "ios:preview:release": "APP_ENV=preview pnpm ios:release",
    "ios:prod:release": "APP_ENV=production pnpm ios:release",

    // Similar scripts for Android have also been added.
  },
}
```

#### How are `src/env.ts` and `app.config.ts` involved in the process?
If env variables are successfully parsed according to the defined schema, they
are consumed in [`app.config.ts`](./app.config.ts) as Expo extra fields. These
fields are then re-exported by [`src/env.ts`](./src/env.ts) to the rest of the
app (screens/components).

`src/env.ts` acts only as the proxy for Expo extra fields to improve the type-safety
of consuming env variables. This file doesn't need to be modified at all (unless
you're changing the entire mechanism of defining and consuming env variables).


## License
Licensed under MIT.
