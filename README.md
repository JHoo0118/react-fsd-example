# React FSD Example

## Set Up

```bash
# dependencies
$ npm i react-router-dom @hookform/resolvers @tanstack/react-query @tanstack/react-query-devtools axios classnames react-error-boundary react-hook-form zod zustand universal-cookie

# dev dependencies
$ npm i -D @vitejs/plugin-react @vitest/coverage-v8 eslint eslint-config-airbnb eslint-config-airbnb-typescript eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-testing-library jsdom path unplugin-fonts vite-plugin-checker vite-plugin-eslint vitest

# tailwindcss (+prettier)
$ npm i -D tailwindcss postcss autoprefixer prettier-plugin-tailwindcss
$ npx tailwindcss init -p

# prettier
$ npm i -D eslint-config-prettier prettier pretty-quick
$ npx prettier --write ./prettier.config.cjs

# dependency-cruiser
$ npm i -D dependency-cruiser
$ npx depcruise --init

# shadcn
$ npm i -D @types/node
$ npx shadcn-ui@latest init

```

## Test Install

```bash

$ npm i -D @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event

```

## Shadcn components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.cjs",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/shared",
    "utils": "@/shared/lib/shadcn"
  }
}
```
