import { decodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Idea } from "../../../../graphql/types.generated";
import { useUpdateIdeaVoteMutation } from "../../../../graphql/updateIdeaVote.generated";
import { projectSlugState, projectState } from "../../../../store/project";
import { currentUserState } from "../../../../store/user";

interface IdeaCountProps {
  id: Idea["id"];
  votedByUser: Idea["votedByUser"];
  count: Idea["voteCount"];
  setCount: (value: number) => void;
}

interface VoteIconProps {
  count: Idea["voteCount"];
}

function VoteIcon({ count }: VoteIconProps) {
  if (count !== null && count !== undefined) {
    if (count === 0) {
      return <span className="text-xl md:text-2xl">💤</span>;
    }
    if (count > 0 && count < 5) {
      return <span className="text-xl md:text-2xl">👍</span>;
    }
    if (count >= 5 && count < 10) {
      return <span className="text-xl md:text-2xl">💪</span>;
    }
    if (count >= 10 && count < 15) {
      return <span className="text-xl md:text-2xl">🙌</span>;
    }
    if (count >= 15 && count < 25) {
      return <span className="text-xl md:text-2xl">🎉</span>;
    }
    if (count >= 25 && count < 35) {
      return <span className="text-xl md:text-2xl">🌶</span>;
    }
    if (count >= 35 && count < 50) {
      return <span className="text-xl md:text-2xl">🔥</span>;
    }
    if (count >= 50) {
      return <span className="text-xl md:text-2xl">🚀</span>;
    }
  }
  return null;
}

const IdeaCount: FC<IdeaCountProps> = ({
  id,
  votedByUser,
  count,
  setCount,
}) => {
  const [, updateIdeaVote] = useUpdateIdeaVoteMutation();

  // current user state
  const currentUser = useRecoilValue(currentUserState);

  // project state
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));

  const handleVote = () => {
    if (project && currentUser) {
      setProject({
        ...project,
        ideas: project?.ideas?.map((idea) => {
          if (decodeGlobalID(idea.id).id === id) {
            if (!idea.votedByUser) {
              if (idea.voteCount || idea.voteCount === 0) {
                setCount(idea.voteCount + 1);
                return {
                  ...idea,
                  votes: idea.votes?.concat([currentUser]),
                  voteCount: idea.voteCount + 1,
                  votedByUser: true,
                };
              }
            } else {
              if (idea.voteCount) {
                setCount(idea.voteCount - 1);
                return {
                  ...idea,
                  votes: idea.votes?.filter(
                    (vote) => vote.email !== currentUser?.email
                  ),
                  voteCount: idea.voteCount - 1,
                  votedByUser: false,
                };
              }
            }
          }
          return idea;
        }),
      });
    }
  };

  return (
    <>
      {count !== null && count !== undefined ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleVote();
            updateIdeaVote({ id })
              .then((result) => {
                console.log(result);
                /* Success */
              })
              .catch((err) => {
                console.log(err);
                handleVote();
              });
          }}
          className={clsx(
            "idea-overview-count md:my-4 md:ml-4 h-[60px] w-11 md:h-20 md:w-14 flex flex-col justify-center items-center rounded md:rounded-lg hover:cursor-pointer",
            { ["bg-indigo-50 hover:bg-indigo-50"]: count === 0 },
            { ["bg-blue-50 hover:bg-blue-50"]: count > 0 && count < 5 },
            { ["bg-sky-50 hover:bg-sky-50"]: count >= 5 && count < 10 },
            { ["bg-cyan-50 hover:bg-cyan-50"]: count >= 10 && count < 15 },
            { ["bg-yellow-50 hover:bg-yellow-50"]: count >= 15 && count < 25 },
            { ["bg-amber-50 hover:bg-amber-50"]: count >= 25 && count < 35 },
            { ["bg-orange-50 hover:bg-orange-50"]: count >= 35 && count < 50 },
            { ["bg-red-50 hover:bg-red-50"]: count >= 50 },
            { ["border-2"]: votedByUser === true },
            {
              ["border-indigo-200 bg-indigo-50"]:
                count === 0 && votedByUser === true,
            },
            {
              ["border-blue-200 bg-blue-50"]:
                count > 0 && count < 5 && votedByUser === true,
            },
            {
              ["border-sky-200 bg-sky-50"]:
                count >= 5 && count < 10 && votedByUser === true,
            },
            {
              ["border-cyan-200 bg-cyan-50"]:
                count >= 10 && count < 15 && votedByUser === true,
            },
            {
              ["border-yellow-200 bg-yellow-50"]:
                count >= 15 && count < 25 && votedByUser === true,
            },
            {
              ["border-amber-200 bg-amber-50"]:
                count >= 25 && count < 35 && votedByUser === true,
            },
            {
              ["border-orange-200 bg-orange-50"]:
                count >= 35 && count < 50 && votedByUser === true,
            },
            { ["border-red-200 bg-red-50"]: count >= 50 },
            { ["lg:bg-transparent"]: votedByUser === false }
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="idea-overview-count-hover absolute hidden -translate-y-10 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              className={clsx(
                "hidden lg:block",
                { ["stroke-indigo-200"]: count === 0 },
                { ["stroke-blue-200"]: count > 0 && count < 5 },
                { ["stroke-sky-200"]: count >= 5 && count < 10 },
                { ["stroke-cyan-200"]: count >= 10 && count < 15 },
                { ["stroke-yellow-200"]: count >= 15 && count < 25 },
                { ["stroke-amber-200"]: count >= 25 && count < 35 },
                { ["stroke-orange-200"]: count >= 35 && count < 50 },
                { ["stroke-red-200"]: count >= 50 },
                { ["opacity-0"]: votedByUser === true }
              )}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 11l7-7 7 7"
            />
            <path
              className={clsx(
                "hidden lg:block",
                { ["stroke-indigo-400"]: count === 0 },
                { ["stroke-blue-400"]: count > 0 && count < 5 },
                { ["stroke-sky-400"]: count >= 5 && count < 10 },
                { ["stroke-cyan-400"]: count >= 10 && count < 15 },
                { ["stroke-yellow-400"]: count >= 15 && count < 25 },
                { ["stroke-amber-400"]: count >= 25 && count < 35 },
                { ["stroke-orange-400"]: count >= 35 && count < 50 },
                { ["stroke-red-400"]: count >= 50 },
                { ["opacity-0"]: votedByUser === true }
              )}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 19l7-7 7 7"
            />
          </svg>
          <VoteIcon count={count} />
          <span className="md:text-xl font-semibold text-slate-900">
            {count}
          </span>
        </div>
      ) : null}
    </>
  );
};

export default IdeaCount;
