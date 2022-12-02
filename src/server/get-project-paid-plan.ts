import { Project } from "@prisma/client";
import { plans } from "./stripe/plans";

const MILLISECONDS_IN_A_DAY = 86_400_000;

export type Plan = keyof typeof plans;
/**
 * @returns the project's paid plan or null if the project is a free one
 *
 * @example
 * ```ts
 * const project = await prisma.project.findFirst(...)
 * const plan = getProjectPaidPlan(project)
 * ```
 */
export const getProjectPaidPlan = (project: Project | null): Plan | null => {
  if (
    !project ||
    !project.stripePriceId ||
    !project.stripeCurrentPeriodEnd ||
    // We give projects a grace period of 24 hours to pay their invoices
    project.stripeCurrentPeriodEnd.getTime() + MILLISECONDS_IN_A_DAY <
      Date.now()
  )
    return null;

  const plan = Object.keys(plans).find(
    (plan) => plans[plan as Plan] === project.stripePriceId
  );

  return (plan as Plan) || null;
};
