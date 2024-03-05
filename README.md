# Next-on-pages local `process.env` issue repro

This is a minimal reproduction showing that `process.env` is not working as expected in the `@cloudflare/next-on-pages/next-dev` module.

`getRequestContext` is indeed working as intended and all bindings accessible via `getRequestContext` should also be accessible via `process.env`, but that doesn't seem to be the case.

> [!NOTE]
> This is a issue related to local development, `process.env` does work as expected in production

## Steps to reproduce the issue

- ```sh
  npm i
  ```

- ```sh
  npm run dev
  ```

- with a browser navigate to `/api/hello`

- notice that the response is `Hello World from a KV store!`

- in `app/api/hello/route.ts` comment out `const from: string = 'reqCtx';` and uncomment `// const from: string = "process.env";`

- refresh the browser and notice that now `/api/hello` returns an error saying that it can't access `put` of `undefined`