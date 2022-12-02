import clsx from "clsx";
import { useRecoilState } from "recoil";
import { useSlate } from "slate-react";
import { editorMarkdownState } from "./../../../../../store/ui/editor";
import { slateElementType } from "./../slateElements";
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleFormat,
} from "./../slateHelper";
import { LeafType } from "./../slateLeafs";
import BoldIcon from "./Icons/BoldIcon";
import CodeBlockIcon from "./Icons/CodeBlockIcon";
import CodeIcon from "./Icons/CodeIcon";
import HeadlineIcon from "./Icons/HeadlineIcon";
import ItalicIcon from "./Icons/ItalicIcon";
import LinkIcon from "./Icons/LinkIcon";
import StrikeIcon from "./Icons/StrikeIcon";
import TodoIcon from "./Icons/TodoIcon";

const TopBar = () => {
  const [markdownState] = useRecoilState(editorMarkdownState);

  const handleElementClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: slateElementType
  ) => {
    event.preventDefault();
    toggleBlock(editor, type, markdownState);
  };

  const handleLeafClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: LeafType
  ) => {
    event.preventDefault();
    toggleFormat(editor, type, markdownState);
  };

  const editor = useSlate();

  return (
    <div className="inset-x-0 top-0 px-3 py-2 border-b border-slate-200">
      <div className="flex gap-2 items-center">
        <div
          onMouseDown={(event) => handleElementClick(event, "headline")}
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-200 cursor-pointer",
            isBlockActive(editor, "headline")
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
        >
          <HeadlineIcon className="h-7 w-7" />
        </div>
        <div className="w-[1px] bg-slate-200 h-6 rounded"></div>
        <div
          onMouseDown={(event) => handleLeafClick(event, "bold")}
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-200 cursor-pointer",
            isMarkActive(editor, "bold")
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
        >
          <BoldIcon className="h-7 w-7" />
        </div>
        <div
          onMouseDown={(event) => handleLeafClick(event, "italic")}
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-200 cursor-pointer",
            isMarkActive(editor, "italic")
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
        >
          <ItalicIcon className="h-7 w-7" />
        </div>
        <div
          onMouseDown={(event) => handleLeafClick(event, "strike_through")}
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-200 cursor-pointer",
            isMarkActive(editor, "strike_through")
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
        >
          <StrikeIcon className="h-7 w-7" />
        </div>
        <div className="w-[1px] bg-slate-200 h-6 rounded"></div>
        <div
          onMouseDown={(event) => handleLeafClick(event, "code")}
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-200 cursor-pointer",
            isMarkActive(editor, "code")
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
        >
          <CodeIcon className="h-7 w-7" />
        </div>
        <div
          onMouseDown={(event) => handleElementClick(event, "code_block")}
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-200 cursor-pointer",
            isBlockActive(editor, "code_block")
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
        >
          <CodeBlockIcon className="h-7 w-7" />
        </div>
        <div className="w-[1px] bg-slate-200 h-6 rounded"></div>
        <div
          onMouseDown={(event) => handleElementClick(event, "bookmark")}
          className="w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-100 hover:bg-slate-50 cursor-pointer"
        >
          <LinkIcon className="h-7 w-7" />
        </div>
        <div
          onMouseDown={(event) => handleElementClick(event, "check-box")}
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-200 cursor-pointer",
            isBlockActive(editor, "check-box")
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
        >
          <TodoIcon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
