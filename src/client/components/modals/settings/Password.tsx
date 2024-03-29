import { useSession } from "next-auth/react";
import { FC } from "react";
import { Icon } from "../../Icons";

interface PasswordProps {
  password: string;
  setPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
}

const Password: FC<PasswordProps> = ({
  password,
  setPassword,
  newPassword,
  setNewPassword,
}) => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="sm:overflow-hidden">
        <div className="bg-white py-6 px-4 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-gray-900">Password</h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                Change your security settings.
              </p>
            </div>

            <div className="sm:col-span-6">
              <fieldset>
                <legend className="text-base font-medium text-gray-900">
                  Two-Factor Authentication
                </legend>
                <p className="text-sm text-blue-gray-500">
                  Increase your account's security by enabling Two-Factor
                  Authentication (2FA).
                </p>
                <div className="mt-4 space-y-4">
                  <div className="relative flex items-center gap-4">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Enable two-factor authentication
                    </button>
                    <div className="flex w-6/12 items-start">
                      <div className="flex-shrink-0">
                        <Icon
                          name="CheckCircleIcon"
                          size="lg"
                          color="success"
                        />
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                          Enabled!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-6">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Change password
                </legend>
                <p className="text-sm text-gray-500">
                  Control your appearance and change your password and email.
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-900"
              >
                Current password
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 block w-full rounded-md border-blue-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-900"
              >
                New password
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="mt-1 block w-full rounded-md border-blue-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export { Password };
