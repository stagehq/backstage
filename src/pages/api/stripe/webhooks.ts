import { NextApiRequest, NextApiResponse } from "next";
import { error } from "next/dist/build/output/log";
import getRawBody from "raw-body";
import Stripe from "stripe";
import prisma from "../../../server/db/prisma";
import stripe from "../../../server/stripe";

const secondsToMsDate = (seconds: number) => new Date(seconds * 1000);

interface StripeSession {
  customer: string;
  metadata: {
    projectId: string;
  };
  subscription: string;
}

/**
 * Syncs Stripe's payment state to our database via their webhooks
 */
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const sig = request.headers["stripe-signature"] as string;
  const body = await getRawBody(request);

  let event: Stripe.Event | null;

  const WEBHOOK_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

  if (!WEBHOOK_ENDPOINT_SECRET)
    throw new Error(
      "Please provide a STRIPE_WEBHOOK_ENDPOINT_SECRET environment variable!"
    );

  // Verify that this is a genuine Stripe request and not just somebody pinging us
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_ENDPOINT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const session = event.data?.object as StripeSession;

  // Initial upgrade to paid
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    await prisma.project.update({
      where: {
        id: session.metadata.projectId,
      },
      data: {
        stripeCurrentPeriodEnd: secondsToMsDate(
          subscription.current_period_end
        ),
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: session.customer,
        stripePriceId: subscription.items.data[0].price.id,
      },
    });
  }

  // Recurring payments
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    await prisma.project.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripeCurrentPeriodEnd: secondsToMsDate(
          subscription.current_period_end
        ),
        stripePriceId: subscription.items.data[0].price.id,
      },
    });
  }

  response.json({ received: true });
};

export const config = {
  api: {
    // Stripe parses the body themselves
    bodyParser: false,
  },
};
