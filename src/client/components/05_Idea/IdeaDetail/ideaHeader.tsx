import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ideaNumberState, ideaState } from "../../../store/idea";
import { projectSlugState, projectState } from "../../../store/project";

import { ClipboardIcon } from "@heroicons/react/outline";
import { decodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SimpleInput from "../../02_AppGlobal/Inputs/SimpleInput";
import IdeaCount from "../IdeaOverview/IdeaVotes";

interface IdeaHeaderProps {
  readOnly: boolean;
  setReadOnly: (value: boolean) => void;
  handleSaveEditor: () => void;
  title: string;
  setTitle: (value: string) => void;
}

const IdeaHeader: FC<IdeaHeaderProps> = ({
  setReadOnly,
  readOnly,
  handleSaveEditor,
  title,
  setTitle,
}) => {
  const [ideaNumber] = useRecoilState(ideaNumberState);
  const [projectSlug] = useRecoilState(projectSlugState);
  const idea = useRecoilValue(ideaState([ideaNumber, projectSlug]));
  const project = useRecoilValue(projectState(projectSlug));
  const [count, setCount] = useState<number>(0);
  const [votedByUser, setVotedByUser] = useState<boolean>(false);
  const { id } = decodeGlobalID(idea ? idea.id : "");

  useEffect(() => {
    if (project) {
      const ideas = project.ideas;
      if (ideas && idea) {
        const voteIdea = ideas.find((x) => x.id === idea.id);
        if (voteIdea) {
          setVotedByUser(voteIdea.votedByUser as boolean);
          setCount(voteIdea.voteCount as number);
        }
      }
    }
  }, [idea, project]);

  const handleClick = () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      handleSaveEditor();
      setReadOnly(true);
    }
  };

  return (
    <div className="flex text-3xl text-slate-900 gap-4 border-b-2 border-slate-100">
      {idea && project && (
        <div className="w-[72px]">
          <IdeaCount
            {...{ id: id, votedByUser: votedByUser, count, setCount }}
          />
        </div>
      )}
      <div className="flex flex-col pr-6 gap-2 justify-top pt-4 pb-3 grow">
        {readOnly ? (
          <h1 className="pt-1 text-2xl font-semibold text-gray-900">{title}</h1>
        ) : (
          <SimpleInput text={title} setText={setTitle} autoFocus />
        )}
        <div className="flex">
          <div className="flex items-center grow gap-2">
            {idea && (
              <div>
                <Link to={`/s/profile/${idea.creator?.alias}`}>
                  <img
                    src={idea?.creator?.image ? idea?.creator.image : ""}
                    referrerPolicy="no-referrer"
                    alt="profile image"
                    className="h-6 w-6 flex-shrink-0 rounded-full bg-slate-500"
                  />
                </Link>
              </div>
            )}
            <div className="flex gap-1">
              <Link to={`/s/profile/${idea?.creator?.alias}`}>
                <div className="text-sm text-slate-800 font-medium">
                  {idea?.creator?.alias
                    ? idea?.creator?.alias
                    : idea?.creator?.name}
                </div>
              </Link>
              <div className="text-sm text-slate-600 font-regular">
                commented 12 hours ago
              </div>
            </div>
          </div>
          <button
            type="button"
            className="rounded w-8 h-8 flex justify-center items-center text-xs font-medium text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ClipboardIcon className="block h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => handleClick()}
            type="button"
            className={clsx(
              "inline-flex items-center rounded px-2.5 py-1.5 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              readOnly
                ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                : "text-white bg-indigo-600 hover:bg-indigo-700"
            )}
          >
            {readOnly ? "Edit" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaHeader;
