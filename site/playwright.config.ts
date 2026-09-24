import { defineConfig } from "@playwright/test";

const PORT = 3100;

/**
 * Runs against the production build: `npm run build`, then start the server
 * (`npx next start -p 3100`) and run `npm run test:e2e`.
 *
 * On Windows, letting Playwright start the server itself makes the runner
 * hang for minutes on teardown, so start it yourself first; with the server
 * already running the whole suite takes seconds.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `node node_modules/next/dist/bin/next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
