import { useRecoilState, useRecoilValue } from "recoil";
import { ideaNumberState, ideaState } from "../../../../store/idea";

import { useParams } from "react-router-dom";
import { User } from "../../../../graphql/types.generated";
import { timeAgo } from "../../../../helper/time";
import { projectSlugState } from "../../../../store/project";
import AuthorItem from "./AuthorItem";
import ContributorItem from "./ContributorItem";
import LabelItem from "./LabelItem";
import StatusMeetingItem from "./StatusMeetingItem";

const IdeaSideBar = () => {
  const params = useParams();
  const [ideaNumber] = useRecoilState(ideaNumberState);
  const [projectSlug] = useRecoilState(projectSlugState);
  const idea = useRecoilValue(ideaState([ideaNumber, projectSlug]));

  console.log(idea);

  return (
    <div className="flex flex-col gap-5">
      {params.ideaId ? (
        <AuthorItem
          authorName={idea?.creator?.name ? idea.creator.name : ""}
          authorImgPath={idea?.creator?.image ? idea.creator.image : null}
          authorAlias={idea?.creator?.alias ? idea.creator.alias : ""}
          creationDate={idea?.createdAt ? timeAgo(idea.createdAt) : ""}
        />
      ) : (
        <AuthorItem />
      )}
      <div className="w-full h-[2px] bg-slate-200"></div>
      <LabelItem />
      <div className="w-full h-[2px] bg-slate-200"></div>
      <StatusMeetingItem />
      {params.ideaId && (
        <div className="flex flex-col gap-5">
          <div className="w-full h-[2px] bg-slate-200"></div>
          <ContributorItem
            participants={idea?.participants ? idea.participants : []}
            creator={idea?.creator as User}
          />
        </div>
      )}
    </div>
  );
};

export default IdeaSideBar;
