import { Popover } from "@headlessui/react";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { BaseRange } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { User } from "../../../../../graphql/types.generated";

export type MentionState = {
  target: BaseRange | undefined;
  index: number;
  search: string;
  filteredUsers: User[];
};
interface MentionsDropdownProps {
  open: boolean;
  mention: MentionState;
  editorSize:
    | {
        rect: DOMRect | undefined;
        pos: {
          top: number;
          left: number;
        };
      }
    | undefined;
}

const MentionsDropdown: FC<MentionsDropdownProps> = ({
  open,
  mention,
  editorSize,
}) => {
  const editor = useSlate();

  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  //use effect for mentions
  useEffect(() => {
    if (
      mention.target &&
      mention.filteredUsers.length > 0 &&
      mention.search !== ""
    ) {
      // const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, mention.target);
      const rect = domRange.getBoundingClientRect();
      const editorTop = editorSize ? editorSize.pos.top : 0;
      const editorLeft = editorSize ? editorSize.pos.left : 0;
      setPopoverPos({
        top: rect.top - editorTop + 20,
        left: rect.left - editorLeft,
      });
    }
  }, [mention.filteredUsers.length, editor, mention, editorSize]);

  return (
    <Popover>
      <>
        {open && mention.filteredUsers.length > 0 && mention.search !== "" && (
          <div>
            <Popover.Panel static>
              <div
                style={{
                  top: `${popoverPos.top}px`,
                  left: `${popoverPos.left}px`,
                }}
                className="absolute z-10 mt-1 max-h-56 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {mention.filteredUsers.map((char, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      i === mention.index
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900"
                    )}
                  >
                    <div className="flex items-center">
                      <img
                        src={char.image ? char.image : ""}
                        referrerPolicy="no-referrer"
                        alt="profile image"
                        className="h-6 w-6 flex-shrink-0 rounded-full bg-slate-500"
                      />
                      <span
                        className={clsx(
                          "ml-3 truncate",
                          i === mention.index ? "font-semibold" : ""
                        )}
                      >
                        {char.alias}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </div>
        )}
      </>
    </Popover>
  );
};

export default MentionsDropdown;
