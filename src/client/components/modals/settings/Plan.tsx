import { RadioGroup, Switch } from "@headlessui/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { FC, useState, useEffect, SetStateAction } from "react";
import toast from "react-hot-toast";
import { User } from "../../../graphql/types.generated";
// import { useUpdatePaymentMutation } from "../../../../graphql/updatePayment.generated";
import { Icon } from "../../Icons";
import Spinner from "../../loading/Spinner";

const plans = [
  {
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    limit: "Always in sync websites",
  },
  {
    name: "Pro",
    priceMonthly: 10,
    priceYearly: 100,
    limit: "Analytics, Pro Blogs and more",
  },
];

interface PlanProps {
  user: User;
}

const Plan: FC<PlanProps> = ({ user }) => {
  /* Set data */
  const { data: session } = useSession();
  // const [, updatePayment] = useUpdatePaymentMutation();

  /* Set UI State */
  const [fieldsEdited, setFieldsEdited] = useState(false);
  const [updateNotificationLoading, setUpdateNotificationLoading] =
    useState(false);

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

  // useEffect(() => {
  //   setSelectedPlan()
  //   setAnnualBillingEnabled()
  // }, [user]);

  return (
    <section aria-labelledby="plan-heading">
      <div className="sm:overflow-hidden">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h2
              id="plan-heading"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Plan
            </h2>
          </div>

          <RadioGroup
            value={selectedPlan}
            onChange={(plan: SetStateAction<{ name: string; priceMonthly: number; priceYearly: number; limit: string; }>) => {
              setSelectedPlan(plan);
              setFieldsEdited(true);
            }}
          >
            <RadioGroup.Label className="sr-only">
              Pricing plans
            </RadioGroup.Label>
            <div className="relative -space-y-px rounded-md bg-white">
              {plans.map((plan, planIdx) => (
                <RadioGroup.Option
                  key={plan.name}
                  value={plan}
                  onChange={() => {
                    setFieldsEdited(true);
                  }}
                  className={({ checked }) =>
                    clsx(
                      planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                      planIdx === plans.length - 1
                        ? "rounded-bl-md rounded-br-md"
                        : "",
                      checked
                        ? "z-10 border-zinc-200 bg-zinc-50"
                        : "border-gray-200",
                      "relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center text-sm">
                        <span
                          className={clsx(
                            checked
                              ? "border-transparent bg-zinc-500"
                              : "border-gray-300 bg-white",
                            active ? "ring-2 ring-zinc-500 ring-offset-2" : "",
                            "flex h-4 w-4 items-center justify-center rounded-full border"
                          )}
                          aria-hidden="true"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                        <RadioGroup.Label
                          as="span"
                          className="ml-3 font-medium text-gray-900"
                        >
                          {plan.name}
                        </RadioGroup.Label>
                      </div>
                      <RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                        <span
                          className={clsx(
                            checked ? "text-zinc-900" : "text-gray-900",
                            "font-medium"
                          )}
                        >
                          ${plan.priceMonthly} / mo
                        </span>{" "}
                        <span
                          className={
                            checked ? "text-zinc-700" : "text-gray-500"
                          }
                        >
                          (${plan.priceYearly} / yr)
                        </span>
                      </RadioGroup.Description>
                      <RadioGroup.Description
                        className={clsx(
                          checked ? "text-zinc-700" : "text-gray-500",
                          "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                        )}
                      >
                        {plan.limit}
                      </RadioGroup.Description>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <Switch.Group as="div" className="flex items-center">
            <Switch
              checked={annualBillingEnabled}
              onChange={setAnnualBillingEnabled}
              className={clsx(
                annualBillingEnabled ? "bg-zinc-500" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  annualBillingEnabled ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3">
              <span className="text-sm font-medium text-gray-900">
                Annual billing{" "}
              </span>
              <span className="text-sm text-gray-500">(Save 10%)</span>
            </Switch.Label>
          </Switch.Group>

          {selectedPlan.name === "Extended" || selectedPlan.name === "Pro" ? (
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-8 mt-4 sm:col-span-4">
                <legend className="text-base font-medium text-gray-900">
                  Billing Information
                </legend>
                <p className="text-sm text-gray-500">
                  Update your billing information. Please note that updating
                  your location could affect your tax rates.
                </p>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="cc-given-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="cc-family-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-1">
                <label
                  htmlFor="expiration-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expration date
                </label>
                <input
                  type="text"
                  name="expiration-date"
                  id="expiration-date"
                  autoComplete="cc-exp"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                  placeholder="MM / YY"
                />
              </div>

              <div className="col-span-4 sm:col-span-1">
                <label
                  htmlFor="security-code"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <span>Security code</span>
                  <Icon name="QuestionMarkCircleIcon" size="lg" color="dark" />
                </label>
                <input
                  type="text"
                  name="security-code"
                  id="security-code"
                  autoComplete="cc-csc"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                />
              </div>
            </div>
          ) : null}
        </div>
        {fieldsEdited && session?.user?.email ? (
          <div className="flex items-center justify-end gap-2 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => {
                setFieldsEdited(false);
              }}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                setUpdateNotificationLoading(true);
                if (session?.user?.email) {
                  toast;
                  // .promise(
                  //   updatePayment({
                  //     firstName: "test",
                  //     lastName: "test",
                  //     email: "test",
                  //     country: "test",
                  //     zip: 73525,
                  //     annualBillingEnabled: annualBillingEnabled,
                  //     plan: selectedPlan.name.toLowerCase() as PaymentPlan,
                  //   }),
                  //   {
                  //     loading: `Save notification ...`,
                  //     success: `Successfully saved!`,
                  //     error: (err) => err,
                  //   }
                  // )
                  // .then(() => {
                  //   setUpdateNotificationLoading(false);
                  //   setFieldsEdited(false);
                  // });
                }
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              {updateNotificationLoading ? (
                <Spinner color={"text-white"} />
              ) : null}
              Save
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Plan;
