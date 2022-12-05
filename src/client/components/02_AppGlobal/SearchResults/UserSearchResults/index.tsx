import { useRouter } from "next/navigation";
import { FC } from "react";
import { User } from "../../../../graphql/types.generated";

interface UserSearchResultsProps {
  userSearchResult: [User] | null;
}

const UserSearchResults: FC<UserSearchResultsProps> = ({
  userSearchResult,
}) => {
  const { push: navigate } = useRouter();

  if (!userSearchResult) return null;
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mb-5">
        <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                ></th>
              </tr>
            </thead>
            <tbody>
              {userSearchResult.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="flex gap-2 items-center justify-start">
                      {user.image && (
                        <img
                          className="inline-block h-8 w-8 rounded-full"
                          referrerPolicy="no-referrer"
                          src={user.image}
                          alt="profile image of user"
                        />
                      )}

                      <div className="font-medium text-gray-900">
                        {user.fullName}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                    {user.id}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right sm:pr-6 md:pr-0">
                    <button
                      onClick={() => navigate(`/profile/${user.alias}`)}
                      className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Go
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserSearchResults;
