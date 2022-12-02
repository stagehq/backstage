import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Idea, User } from "../../../../graphql/types.generated";
import {
  labelSelectState,
  userSelectState,
} from "../../../../store/ui/ideasFilter";

import { ChatAlt2Icon } from "@heroicons/react/outline";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { useRecoilValue } from "recoil";
import { timeAgo } from "../../../../helper/time";
import Label from "../../../02_AppGlobal/Label";
import IdeaVotes from "../IdeaVotes";

interface IdeaCardProps {
  idea: Idea;
  key: number;
}

const IdeaCard: FC<IdeaCardProps> = ({ idea, key }) => {
  // label state
  const selectedLabel = useRecoilValue(labelSelectState);
  const selectedUser = useRecoilValue(userSelectState);

  const IdeaCardContent: FC<IdeaCardProps> = ({ idea, key }) => {
    const {push: navigate} = useRouter()
    const { id } = decodeGlobalID(idea.id);

    // state for vote count
    const [count, setCount] = useState(idea.voteCount);

    console.log(idea);

    return (
      <div
        key={String(key)}
        className="relative w-full h-fit flex gap-4 md:gap-6 md:items-center bg-white md:rounded-lg border-b-[1px] border-gray-100 md:border-none px-4 md:px-0 pb-4 md:pb-0 lg:pr-56 cursor-pointer"
      >
        <IdeaVotes
          {...{ id, votedByUser: idea.votedByUser, count, setCount }}
        />
        <div className="w-[calc(100%_-_60px)] md:w-[calc(100%_-_160px)] lg:w-[calc(100%_-_104px)] flex justify-between gap-6 md:my-4">
          <div className="lg:w-2/3 flex flex-col self-start">
            {/* Idea Title */}
            <span className="font-medium text-sm text-slate-500">
              #{idea.number}
            </span>
            <Link href={`../ideas/${idea.number}`}>
              <p className="mt-0 md:text-lg font-semibold text-slate-900">
                {idea.title}
              </p>
            </Link>
            {/* Idea Labels */}
            {idea.labels && idea.labels.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {idea.labels.map((label) => (
                  <Label label={label} />
                ))}
              </div>
            ) : null}
          </div>
          <div className="w-1/3 hidden lg:flex justify-end items-center -gap-4">
            {/* Contributer Images */}
            <div className="flex -space-x-1 relative z-0 overflow-hidden">
              {idea.creator?.image ? (
                <Link href={`/profile/${idea.creator.alias}`}>
                  <img
                    src={idea.creator.image}
                    referrerPolicy="no-referrer"
                    alt="creator image"
                    className="relative z-10 inline-block h-8 w-8 rounded-full ring-4 ring-white"
                  />
                </Link>
              ) : null}
              {idea.participants
                ? idea.participants.slice(0, 6).map((participant: User) => {
                    if (participant.image) {
                      return (
                        <Link href={`/profile/${participant.alias}`}>
                          <img
                            src={participant.image}
                            referrerPolicy="no-referrer"
                            alt="participant image"
                            className="bg-white relative z-10 inline-block h-8 w-8 rounded-full ring-4 ring-white"
                            key={participant.id}
                          />
                        </Link>
                      );
                    }
                  })
                : null}
              {idea.participants && idea.participants.length >= 6 && (
                <div className="z-10 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-white ring-4 ring-white text-sm font-normal text-slate-600">
                  <div>+{idea.participants.length - 6}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Idea Date */}
        <span className="absolute top-0 right-4 md:top-4 md:right-6 lg:right-6 text-slate-500 font-medium text-sm whitespace-nowrap">
          updated {idea.modifiedAt ? timeAgo(idea.modifiedAt) : ""}
        </span>
        {/* Comments */}
        <div className="hidden absolute bottom-4 right-6 lg:flex items-center gap-1 font-medium">
          {/* <span className="text-slate-700 text-sm">{idea.commentCount}</span> */}
          <ChatAlt2Icon
            className="-mr-1 h-5 w-5 text-slate-700"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  };

  /* Filter by label */
  if (
    selectedLabel &&
    idea.labels &&
    idea.labels.some((label) => label.id === selectedLabel.id)
  ) {
    return <IdeaCardContent idea={idea} key={key} />;
  }

  /* Filter by user */
  if (
    (selectedUser &&
      idea.participants &&
      idea.participants.some(
        (participant) => participant.id === selectedUser.id
      )) ||
    (selectedUser && idea.creator && idea.creator.id === selectedUser.id)
  ) {
    return <IdeaCardContent idea={idea} key={key} />;
  }

  if (!selectedLabel && !selectedUser) {
    return <IdeaCardContent idea={idea} key={key} />;
  }

  return null;
};

export default IdeaCard;
