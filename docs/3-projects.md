# Projects

Projects are at the core of Bedrock. Many users can be members of a single project, and each user can be a member of many projects. Each project has it's own billing, and you should attach your business-specific data to projects.

For example, [Feedback Fish](https://feedback.fish) adds `Project.feedbacks` (all the feedback a project has received) and [Changefeed](https://changefeed.app) `Project.releases` (all the releases a project has published). If you were building a collaborative team todo app you would add something like `Project.todos`, a customer support tool something like `Project.requests`, etc.

## URL structure

From a user perspective, all the URLs in Bedrock are already set up to be human-readable and memorable:

- `/app` is the user's own dashboard
- `/app/settings` are the user's settings
- `/app/[slug]` is a project's dashboard, e.g. `/app/fruits-inc`
- `/app/[slug]/settings` are the project's settings, e.g. `/app/fruits-inc/settings`

Assuming your users remember their (human-readable!) slug, they can quickly open any page they want. That's a feature!

## Payments

Bedrock uses [Stripe Checkout](https://stripe.com/docs/payments/checkout) for subscription payments.

Once a customer checks out and pays for your product, and then every billing period when they pay again, Stripe pings the webhook endpoint (`src/pages/api/stripe/webhooks.ts`) and we store the following data in the database:

- `Project.stripeCustomerId`: Every "project" in Bedrock is a single "customer" in Stripe...
- `Project.stripeSubscriptionId`: ...each of whom can have one "subscription"...
- `Project.stripePriceId`: ...to a specific "price" (i.e. plan)...
- `Project.stripeCurrentPeriodEnd`: ...that gets billed at this point in time.

How and what exactly you charge is entirely up to how you configure your "price" in Stripe. You can do fixed-price, usage-based, per-seat, or any other kind of pricing that Stripe supports. See [their documentation](https://stripe.com/docs/billing/subscriptions/examples) for more information!

Importantly, note how all the billing is per-project, rather than per-user. While that might seem like a small distinction, it's critical to decouple users and billing so users can be members of multiple projects (and conversely, projects can have multiple members).

For production, you'll want to point Stripe at your production webhook endpoint (i.e. `<yourproductionurl>.com/api/stripe/webhooks`), otherwise payments won't work in production.

### Multiple plans

To add multiple plans like "Pro" and "Enterprise" or "Monthly" and "Yearly":

1. Add all your plans to `src/server/stripe/plans.ts` with their Stripe IDs
2. Run `yarn run generate` to update the GraphQL API with the new plans
3. Edit the `UpgradeButton` component in `src/client/components/UpgradeButton/index.tsx` with some kind of toggle to switch between the payment plans

### Subscription cancellations

There is no code to handle cancellation or non-payment of subscriptions. That is implicitly handled in the Stripe webhook listener and how Bedrock syncs `Project.stripeCurrentPeriodEnds` on `payment_succeeded` with Stripe.

If a project cancels or doesn't pay their subscription, i.e. there is no `payment_succeeded` webhook call, `Project.stripeCurrentPeriodEnds` is never updated beyond the amount of time that the project has paid for.

Once that time expires, that project will no longer be a "paid" project fully automatically! (see `src/server/get-project-paid-plan.ts`)

## Invitation system

The project invitation system is completely stateless. Once users enter the email of the person they want to invite:

1. The client calls the `inviteToProject` mutation, which generates a JWT token (`server/invitations/token.ts`) that contains the project's ID
2. The mutation sends the invited person an email with a link to `${url}/api/invitations/accept?token=<token>`
3. Once the person click on the link in the email, the `/api/invitations/accept` route verifies the passed token
4. And finally adds the user to the project or redirects them to authenticate first if they aren't logged-in already
