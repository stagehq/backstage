import { FC } from "react";
import { Idea } from "../../../../graphql/types.generated";

interface IdeaSearchResultsProps {
  ideaSearchResult: [Idea] | null;
}

const IdeaSearchResults: FC<IdeaSearchResultsProps> = ({
  ideaSearchResult,
}) => {
  if (!ideaSearchResult) return null;
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
                  Idea
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
              {ideaSearchResult.map((idea) => (
                <tr key={idea.id} className="border-b border-gray-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-gray-900">
                      {idea.title}
                    </div>
                  </td>
                  <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                    {idea.id}
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

export default IdeaSearchResults;