/// <reference types="cypress" />
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleSocialLogin } = require("cypress-social-logins").plugins;

module.exports = (on, config) => {
  on("task", {
    GoogleSocialLogin: GoogleSocialLogin,
  });
};
