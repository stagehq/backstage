import { RadioGroup, Switch } from "@headlessui/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { User } from "../../../graphql/types.generated";
// import { useUpdatePaymentMutation } from "../../../../graphql/updatePayment.generated";
import Spinner from "../../../_old/components/02_AppGlobal/Icons/Spinner";
import { Icon } from "../../Icons";

const plans = [
  {
    name: "Starter",
    priceMonthly: 0,
    priceYearly: 0,
    limit: "Up to 20 initiatives and ideas",
  },
  {
    name: "Extended",
    priceMonthly: 29,
    priceYearly: 290,
    limit: "Up to 100 initiatives and ideas",
  },
  {
    name: "Pro",
    priceMonthly: 99,
    priceYearly: 990,
    limit: "Unlimited initiatives and ideas",
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
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h2
              id="plan-heading"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Plan
            </h2>
          </div>

          <RadioGroup
            value={selectedPlan}
            // onChange={(plan) => {
            //   setSelectedPlan(plan);
            //   setFieldsEdited(true);
            // }}
          >
            <RadioGroup.Label className="sr-only">
              Pricing plans
            </RadioGroup.Label>
            <div className="relative bg-white rounded-md -space-y-px">
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
                        ? "bg-zinc-50 border-zinc-200 z-10"
                        : "border-gray-200",
                      "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center text-sm">
                        <span
                          className={clsx(
                            checked
                              ? "bg-zinc-500 border-transparent"
                              : "bg-white border-gray-300",
                            active ? "ring-2 ring-offset-2 ring-zinc-500" : "",
                            "h-4 w-4 rounded-full border flex items-center justify-center"
                          )}
                          aria-hidden="true"
                        >
                          <span className="rounded-full bg-white w-1.5 h-1.5" />
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
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors ease-in-out duration-200"
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  annualBillingEnabled ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
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
              <div className="mt-4 col-span-8 sm:col-span-4">
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
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
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
                />
              </div>
            </div>
          ) : null}
        </div>
        {fieldsEdited && session?.user?.email ? (
          <div className="px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setFieldsEdited(false);
              }}
              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
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
              className="bg-zinc-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
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
