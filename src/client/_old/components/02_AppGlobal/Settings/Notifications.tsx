import { FC, useState } from "react";
import { User } from "../../../../graphql/types.generated";

import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
// import { useUpdateNotificationMutation } from "../../../../graphql/updateNotification.generated";
import Spinner from "../Icons/Spinner";

interface NotificationProps {
  user: User;
}

const Notifications: FC<NotificationProps> = ({ user }) => {
  /* Set data */
  const { data: session } = useSession();
  // const [, updateNotification] = useUpdateNotificationMutation();

  /* Set UI State */
  const [fieldsEdited, setFieldsEdited] = useState(false);
  const [updateNotificationLoading, setUpdateNotificationLoading] =
    useState(false);

  /* Set notification */
  const [ideaNotification, setIdeaNotification] = useState<boolean>(false);
  const [initivativeNotification, setInitivativeNotification] =
    useState<boolean>(false);
  const [statusMeetingsNotification, setStatusMeetingsNotification] =
    useState<boolean>(false);
  const [chatNotification, setChatNotification] = useState<boolean>(false);
  const [pushNotification, setPushNotification] = useState<
    "always" | "same_as_notification" | "never"
  >("same_as_notification");

  // useEffect(() => {
  //   setIdeaNotification(
  //     user.notification?.idea ? user.notification?.idea : false
  //   );
  //   setInitivativeNotification(
  //     user.notification?.initiative ? user.notification?.initiative : false
  //   );
  //   setStatusMeetingsNotification(
  //     user.notification?.meeting ? user.notification?.meeting : false
  //   );
  //   setChatNotification(
  //     user.notification?.chat ? user.notification?.chat : false
  //   );
  //   setPushNotification(
  //     user.notification?.push ? user.notification?.push : "same_as_notification"
  //   );
  // }, [user]);

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white py-6 px-4 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>
          </div>

          <div className="sm:col-span-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-900">
                By Email
              </legend>
              <div className="mt-4 space-y-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      checked={ideaNotification}
                      onChange={() => {
                        setFieldsEdited(true);
                        setIdeaNotification(!ideaNotification);
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-700"
                    >
                      Ideas
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts an idea or a comment in
                      an idea.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      checked={initivativeNotification}
                      onChange={() => {
                        setFieldsEdited(true);
                        setInitivativeNotification(!initivativeNotification);
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-700"
                    >
                      Initiative
                    </label>
                    <p className="text-gray-500">
                      Get notified when an initiative gets created or has new
                      updates.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      checked={statusMeetingsNotification}
                      onChange={() => {
                        setFieldsEdited(true);
                        setStatusMeetingsNotification(
                          !statusMeetingsNotification
                        );
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-700"
                    >
                      Status meetings
                    </label>
                    <p className="text-gray-500">
                      Be informed about updates to status meetings and messages.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      checked={chatNotification}
                      onChange={() => {
                        setFieldsEdited(true);
                        setChatNotification(!chatNotification);
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-700"
                    >
                      Chat
                    </label>
                    <p className="text-gray-500">
                      Get all chat messages to yout inbox, nicely bundled.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-6">
            <fieldset className="mt-6">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Push Notifications
                </legend>
                <p className="text-sm text-gray-500">
                  These are delivered via SMS to your mobile phone.
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    value="always"
                    checked={pushNotification === "always"}
                    onChange={() => {
                      setFieldsEdited(true);
                      setPushNotification("always");
                    }}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="push-everything"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    value="same_as_notification"
                    checked={pushNotification === "same_as_notification"}
                    onChange={() => {
                      setFieldsEdited(true);
                      setPushNotification("same_as_notification");
                    }}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="push-email"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    value="never"
                    checked={pushNotification === "never"}
                    onChange={() => {
                      setFieldsEdited(true);
                      setPushNotification("never");
                    }}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      {fieldsEdited && session?.user?.email ? (
        <div className="px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setFieldsEdited(false);
            }}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
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
                //   updateNotification({
                //     idea: ideaNotification,
                //     initiative: initivativeNotification,
                //     meeting: statusMeetingsNotification,
                //     chat: chatNotification,
                //     push: pushNotification as PushNotification,
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
            className="bg-blue-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
          >
            {updateNotificationLoading ? (
              <Spinner color={"text-white"} />
            ) : null}
            Save
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;
