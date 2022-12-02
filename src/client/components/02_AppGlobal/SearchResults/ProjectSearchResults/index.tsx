import { FC } from "react";
import { useRouter } from 'next/navigation';
import { Project } from "../../../../graphql/types.generated";

interface ProjectSearchResultsProps {
  discoverSearchResult: [Project] | null;
}

const ProjectSearchResults: FC<ProjectSearchResultsProps> = ({
  discoverSearchResult,
}) => {
  const {push: navigate} = useRouter()

  if (!discoverSearchResult) return null;

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
                  Project
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Slug
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                ></th>
              </tr>
            </thead>
            <tbody>
              {discoverSearchResult.map((project) => (
                <tr key={project.id} className="border-b border-gray-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-gray-900">
                      {project.name}
                    </div>
                  </td>
                  <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                    {project.id}
                  </td>
                  <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                    {project.slug}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right sm:pr-6 md:pr-0">
                    <button
                      onClick={() => navigate(`/workspace/${project.slug}`)}
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

export default ProjectSearchResults;
