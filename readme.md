# create-avid-app

> Yet another template for Expo (React Native) projects!

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
- [`react-navigation`](https://reactnavigation.org) (this template doesn't use `expo-router`)
- [`react-native-svg`](https://github.com/kristerkari/react-native-svg-transformer)
- [`react-query`](https://tanstack.com/query/latest/docs/framework/react/installation) (basic setup)
- [`husky`](https://github.com/typicode/husky) (runs a check on [`pre-push`](./.husky/pre-push) by default)
- [`twrnc`](https://github.com/jaredh159/tailwind-react-native-classnames) and
    [`tabler-icons`](https://tabler.io/icons) (read more on styling [below](#styling))
- [`zod`](https://zod.dev) for validating `.env` schema (read more on env management [below](#env-management))

### Styling
This template uses [`twrnc`]((https://github.com/jaredh159/tailwind-react-native-classnames))
(a performant TailwindCSS-based library) for styling and supports dark mode by default
(responding to the device's theme preference).

Instead of creating stylesheets, you style components inline like this:
```tsx
import { Text, View } from "react-native";
import { tw } from "@/ui/theme";

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
- styles can be quite long and ugly (spanning across lines)
- not every Tailwind class is supported — check out the [library's docs](https://github.com/jaredh159/tailwind-react-native-classnames) for more info

### Env management

> [!TIP]
> TLDR; to add an env variable for development: add it to `.env.development`,
> add the variable key to the schema in `build-env.ts`, and finally consume it in
> screens/components by importing `Env` from `@/env`.

Env variables are validated with `zod` at build time to ensure consistent/correct
values. Unlike [Expo's default mechanism](https://docs.expo.dev/guides/environment-variables/)
to set and read env variables (which this template doesn't use), the variables
you want to define don't need to be preprended with `EXPO_PUBLIC` (although you
should still **assume that they're accessible by your users!**).

#### Defining env variables
To define env variables, add the key-value pair to any/all of these environment-specific
files and add the key name to the schema in [`build-env.ts`](#build-envts):
- `.env.development`
- `.env.preview`
- `.env.production`

To choose which environment to load variables from, set the `APP_ENV` env variable
to either one of: `development` (default if unspecified) | `preview` | `production`.
Scripts have also been added to `package.json` to help simplify this for you.

#### [`build-env.ts`](./build-env.ts)
This is where you set the schema for your env files. It has detailed comments
on the expected naming convention of `.env` files and how to use them. This file
loads env variables and parses them, throwing a build error if the values don't
match the defined schema. Successfully parsed env variables are then consumed in
[`app.config.ts`](./app.config.ts) as Expo extra fields, which are then propagated
by [`src/env.ts`](#srcenvts).

#### [`src/env.ts`](./src/env.ts)
This file acts only as the proxy for Expo extra fields to improve the type-safety of
[consuming env variables](#consuming-env-variables-in-screenscomponents). This
file doesn't need to be modified at all (unless you're changing the mechanism of
defining and consuming env variables).

#### Consuming env variables in screens/components
```tsx
import { Env } from "@/env";

async function getUsers(): Promise<User> {
  // `BASE_API_URL` will be typechecked if you define it as part of the schema
  // in `build-env.ts`.
  const res = await fetch(`${Env.BASE_API_URL}/api/users`);
  return res.json();
}
```

## License
Licensed under MIT.
