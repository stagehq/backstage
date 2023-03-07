import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  env: {
    GOOGLE_USER: "username@company.com",
    GOOGLE_PW: "password",
    COOKIE_NAME: "next-auth.session-token",
    SITE_NAME: "http://localhost:3000",
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        GoogleSocialLogin: require("cypress-social-logins").plugins
          .GoogleSocialLogin,
      });
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
  },
});
