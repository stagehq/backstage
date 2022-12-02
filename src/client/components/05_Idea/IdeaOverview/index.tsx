import { useRecoilState, useRecoilValue } from "recoil";
import { projectSlugState, projectState } from "../../../store/project";

import { useEffect } from "react";
import { filterState } from "../../../store/ui/ideasFilter";
import IdeaBar from "./FilterBar";
import IdeaCard from "./IdeaCard";

// function which has string as an argument and returns unix timestamp in seconds
const getUnixTime = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.getTime() / 1000;
};

const IdeaOverview = () => {
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [filter, setFilter] = useRecoilState(filterState);

  // use effec when filter change sort the ideas based on filter
  useEffect(() => {
    if (filter && project && project.ideas) {
      const sortedIdeas = [...project.ideas];

      sortedIdeas.sort((a, b) => {
        if (!a.voteCount || !b.voteCount) return 0;
        if (filter === "trending") {
          return b.voteCount && a.voteCount && b.voteCount - a.voteCount;
        }
        // TODO: parse date for typescript
        if (filter === "newest") {
          return b.createdAt && a.createdAt
            ? getUnixTime(b.createdAt) - getUnixTime(a.createdAt)
            : 0;
        }
        if (filter === "latest") {
          return b.modifiedAt && a.modifiedAt
            ? getUnixTime(b.modifiedAt) - getUnixTime(a.modifiedAt)
            : 0;
        }
        return b.createdAt && a.createdAt
          ? getUnixTime(b.createdAt) - getUnixTime(a.createdAt)
          : 0;
      });

      setProject({
        ...project,
        ideas: [...sortedIdeas],
      });
    }
  }, [filter]);

  if (project !== null) {
    return (
      <>
        <IdeaBar />
        {project.ideas && project.ideas.length > 0 ? (
          <div className="flex flex-col gap-4">
            {project.ideas.map((idea, i) => {
              return (
                <div key={i}>
                  <IdeaCard key={i} idea={idea} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative w-full h-[calc(100%_-_64px)] flex flex-col justify-center items-center text-center text-slate-900 px-4 md:px-0">
            <h2 className="mt-12 mb-6 text-3xl font-semibold">
              Every great success starts with an idea.
            </h2>
            <p className="max-w-sm mb-12">
              Write down what you have in mind and share it with your community.
            </p>
            <div className="max-w-sm w-80 md:w-96 rounded-xl bg-slate-200 md:bg-white flex gap-4 px-4 py-3 mb-2">
              <span className="w-12 text-center text-3xl leading-none">🔥</span>
              <div className="w-7/12 rounded-xl bg-white md:bg-slate-100"></div>
            </div>
            <div className="max-w-sm w-80 md:w-96 rounded-xl bg-slate-200 md:bg-white flex gap-4 px-4 py-3 mb-2">
              <span className="w-12 text-center text-3xl leading-none">🌶</span>
              <div className="w-9/12 rounded-xl bg-white md:bg-slate-100"></div>
            </div>
            <div className="max-w-sm w-80 md:w-96 rounded-xl bg-slate-200 md:bg-white flex gap-4 px-4 py-3">
              <span className="w-12 text-center text-3xl leading-none">🎉</span>
              <div className="w-5/12 rounded-xl bg-white md:bg-slate-100"></div>
            </div>
            <div className="absolute -top-6 right-4 md:right-0 flex flex-col items-end text-left drop-shadow-[0_4px_32px_rgba(0,0,0,0.10)]">
              <div className="w-0 h-0 border-solid border-x-[12px] border-x-transparent border-t-[12px] border-t-transparent border-b-[12px] border-b-white mr-[39px] md:mr-[55px]"></div>
              <div className="max-w-sm w-[calc(100vw_-_32px)] bg-white rounded-xl flex gap-4 p-4 pr-5">
                <div className="w-11 h-11 rounded-full bg-indigo-50 flex justify-center items-center">
                  <svg
                    className="stroke-indigo-600 mx-[10px]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 15.546C20.477 15.546 19.954 15.697 19.5 16C19.0558 16.2962 18.5339 16.4542 18 16.4542C17.4661 16.4542 16.9442 16.2962 16.5 16C16.0558 15.7038 15.5339 15.5458 15 15.5458C14.4661 15.5458 13.9442 15.7038 13.5 16C13.0558 16.2962 12.5339 16.4542 12 16.4542C11.4661 16.4542 10.9442 16.2962 10.5 16C10.0558 15.7038 9.53387 15.5458 9 15.5458C8.46613 15.5458 7.9442 15.7038 7.5 16C7.0558 16.2962 6.53387 16.4542 6 16.4542C5.46613 16.4542 4.9442 16.2962 4.5 16C4.05586 15.7037 3.53388 15.5458 3 15.546H21ZM9 6V8V6ZM12 6V8V6ZM15 6V8V6ZM9 3H9.01H9ZM12 3H12.01H12ZM15 3H15.01H15ZM21 21V14C21 13.4696 20.7893 12.9609 20.4142 12.5858C20.0391 12.2107 19.5304 12 19 12H5C4.46957 12 3.96086 12.2107 3.58579 12.5858C3.21071 12.9609 3 13.4696 3 14V21H21ZM18 12V10C18 9.46957 17.7893 8.96086 17.4142 8.58579C17.0391 8.21071 16.5304 8 16 8H8C7.46957 8 6.96086 8.21071 6.58579 8.58579C6.21071 8.96086 6 9.46957 6 10V12H18Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <span className="text-slate-900 font-semibold leading-none">
                    Create your first idea
                  </span>
                  <p className="text-slate-500 text-sm">
                    Click here to create an idea. Every great success starts
                    with an idea. So let’s get started!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default IdeaOverview;
