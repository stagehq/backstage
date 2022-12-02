import Stripe from "stripe";

if (process.browser)
  throw new Error(
    "DO NOT USE stripe/server.ts IN THE BROWSER AS YOU WILL EXPOSE FULL CONTROL OVER YOUR STRIPE ACCOUNT!"
  );

if (!process.env.STRIPE_SECRET_API_KEY)
  throw new Error(
    `Please provide a STRIPE_SECRET_API_KEY environment variable!`
  );

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
  // @ts-ignore The Stripe docs state that null denotes the Stripe account's default version and to use ts-ignore
  apiVersion: null,
  appInfo: {
    name: "Bedrock",
    // NOTE: Do not change this
    partner_id: "pp_partner_IsY1mtoxV00gSQ",
  },
});

export default stripe;
