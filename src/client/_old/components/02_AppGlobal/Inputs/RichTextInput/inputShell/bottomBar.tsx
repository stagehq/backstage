import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Descendant } from "slate";
import { useSlate } from "slate-react";
import { CustomElement } from "..";
import {
  editorFormatBarState,
  editorMarkdownState,
} from "../../../../../../store/ui/editor";
import {
  deserializeToSlate,
  getMarkdownFromEditor,
  serializeToMarkdown,
} from "../slateMarkdownParser";
import FileIcon from "./Icons/FileIcon";
import FormatIcon from "./Icons/FormatIcon";
import MarkdownIcon from "./Icons/MarkdownIcon";
import MentionIcon from "./Icons/MentionIcon";

interface BottomBarProps {
  withSendButton: boolean;
  sendButtonText?: string;
  handleSend?: () => void;
  tinyView: boolean;
  isNewInputField: boolean;
}

const BottomBar: FC<BottomBarProps> = ({
  withSendButton,
  sendButtonText,
  handleSend,
  isNewInputField,
}) => {
  const editor = useSlate();
  const notInitialRender = useRef(false);

  const [formatBarState, setFormatBarState] =
    useRecoilState(editorFormatBarState);
  const [markdownState, setMarkdownState] = useRecoilState(editorMarkdownState);

  const handleMySend = () => {
    if (handleSend) handleSend();
    if (isNewInputField) {
      const slateObj: CustomElement[] = JSON.parse(
        '[{"type":"paragraph","children":[{"text":""}]}]'
      );
      editor.children.map((node) => {
        editor.apply({ type: "remove_node", path: [0], node });
      });
      slateObj.map((node, i) => {
        editor.apply({ type: "insert_node", path: [i], node });
      });
    }
  };

  // use effect if markdown state changes, update editor
  useEffect(() => {
    if (notInitialRender.current) {
      if (!markdownState) {
        //@ts-ignore
        if (editor.children[0].type === "markdown") {
          const markdown = getMarkdownFromEditor(editor);
          const slateObj = deserializeToSlate(markdown);
          editor.children.map((node) => {
            editor.apply({ type: "remove_node", path: [0], node });
          });
          slateObj.map((node, i) => {
            editor.apply({ type: "insert_node", path: [i], node });
          });
        }
      } else {
        //get slate nodes
        const editorNodes: Descendant[] = editor.children;

        //serialize markup
        const markdown = serializeToMarkdown(editorNodes as CustomElement[]);
        const newNode: CustomElement = {
          type: "markdown",
          children: [{ text: markdown }],
        };
        editor.children.map((node) => {
          editor.apply({ type: "remove_node", path: [0], node });
        });
        editor.apply({ type: "insert_node", path: [0], node: newNode });
      }
    } else {
      notInitialRender.current = true;
    }
  }, [markdownState, editor]);

  return (
    <div className="inset-x-0 bottom-0 px-3 py-2 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-100 hover:bg-slate-50 cursor-pointer",
            markdownState
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
          onClick={() => setMarkdownState(!markdownState)}
        >
          <MarkdownIcon className="h-7 w-7" />
        </div>
        <div
          className={clsx(
            "w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-100 hover:bg-slate-50 cursor-pointer",
            formatBarState
              ? "bg-slate-200 hover:bg-slate-300"
              : "hover:bg-slate-50"
          )}
          onClick={() => setFormatBarState(!formatBarState)}
        >
          <FormatIcon className="h-7 w-7" />
        </div>
        <div className="w-[1px] bg-slate-200 h-6 rounded"></div>
        <div className="w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-100 hover:bg-slate-50 cursor-pointer">
          <FileIcon className="h-7 w-7" />
        </div>
        <div className="w-8 h-8 rounded flex justify-center items-center opacity-60 hover:opacity-100 hover:bg-slate-50 cursor-pointer">
          <MentionIcon className="h-7 w-7" />
        </div>
      </div>
      {withSendButton && (
        <div
          onClick={() => handleMySend()}
          className="h-8 bg-indigo-600 text-white rounded-md flex items-center justify-center text-sm px-2 cursor-pointer hover:bg-indigo-800"
        >
          {sendButtonText}
        </div>
      )}
    </div>
  );
};

export default BottomBar;
