import data from "@emoji-mart/data";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Reaction } from "../../../graphql/types.generated";
import { currentUserState } from "../../../store/user";

//@ts-ignore
import { Picker, PickerProps } from "emoji-mart";
interface ReactionBarProps {
  reactions?: Reaction[];
  handleReactionBarAction: (unified: string, fromPicker: boolean) => void;
  onlyPicker: boolean;
}

const ReactionBar: FC<ReactionBarProps> = ({
  reactions,
  handleReactionBarAction,
  onlyPicker,
}) => {
  const [currentUser] = useRecoilState(currentUserState);

  //Picker State
  const [picker, setPicker] = useState(false);

  const handleClose = (emoji: { native: string; unified: string }) => {
    setPicker(false);
    handleReactionBarAction(emoji.unified, true);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        <div
          onClick={() => setPicker(picker ? false : true)}
          className="flex gap-1 px-2 w-max h-8 bg-white items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <img
            className="w-5 h-5"
            src="/icons/icon-add-emoji.svg"
            alt="emoji"
          />
        </div>
        {!onlyPicker &&
          reactions &&
          reactions.map((reaction, index) => (
            <div
              onClick={() =>
                handleReactionBarAction(
                  reaction.content ? reaction.content : "",
                  false
                )
              }
              key={index}
              className={clsx(
                "flex gap-1 px-2 w-max h-8 items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer",
                reaction.reactionGroup?.find(
                  (user) => user.email === currentUser?.email
                )
                  ? "bg-indigo-50 border-2 border-indigo-200"
                  : "bg-white"
              )}
            >
              <div className="text-xl">
                {reaction.content &&
                  String.fromCodePoint(parseInt(reaction.content, 16))}
              </div>
              {reaction.reactionGroup &&
                reaction.reactionGroup?.length != 1 && (
                  <div className="text-sm font-normal text-slate-600">
                    {reaction.reactionGroup?.length}
                  </div>
                )}
            </div>
          ))}
      </div>
      {/* Picker */}
      {picker && (
        <div
          onClick={() => setPicker(false)}
          className="w-screen h-screen absolute top-0 left-0"
        />
      )}
      {picker && (
        <div className="relative">
          <EmojiPicker onEmojiSelect={handleClose} />
        </div>
      )}
    </div>
  );
};

export default ReactionBar;

const EmojiPicker = (props: PickerProps | Readonly<PickerProps> | any) => {
  const ref = useRef(null);

  useEffect(() => {
    new Picker({ ...props, data, ref });
  });

  return <div className="absolute z-10 top-0" ref={ref} />;
};
