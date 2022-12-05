import { FC } from "react";
import { Element as MySlateElement, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { CustomElement } from "./index";

export type slateElementType =
  | "check-box"
  | "code_block"
  | "paragraph"
  | "headline"
  | "bookmark"
  | "markdown";
export const isElementTypes = [
  "check-box",
  "code_block",
  "paragraph",
  "headline",
  "bookmark",
  "markdown",
];
export const blockMarkdownTable = [
  { type: "check-box", notation: "- [ ] ", focus: 0 },
  { type: "code_block", notation: "\n```\n\n```\n", focus: 5 },
  { type: "headline", notation: "# ", focus: 0 },
  { type: "bookmark", notation: "[link name]()", focus: 1 },
];

interface SlateElementProps {
  attributes: any;
  children: React.ReactNode;
  element: CustomElement;
  setRichText?: (value: string) => void;
  handleSaveEditor?: () => void;
}

export const SlateElement: FC<SlateElementProps> = ({
  attributes,
  children,
  element,
  setRichText,
  handleSaveEditor,
}) => {
  switch (element.type) {
    case "check-box":
      return (
        <CheckBox
          attributes={attributes}
          children={children}
          element={element}
          setRichText={setRichText}
          handleSaveEditor={handleSaveEditor}
        />
      );
    case "headline":
      return (
        <Headline
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case "bookmark":
      return (
        <Bookmark
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case "code_block":
      return (
        <CodeBlock
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case "markdown":
      return (
        <MarkdownBlock
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    default:
      return (
        <div className="text-sm mb-3" {...attributes}>
          {children}
        </div>
      );
  }
};

const CodeBlock: FC<SlateElementProps> = ({ attributes, children }) => {
  return (
    <pre
      className="text-xs font-sm w-full overflow-scroll bg-slate-100 rounded p-5 mt-5 mb-3 font-[jetBrainsMono]"
      {...attributes}
    >
      <code>{children}</code>
    </pre>
  );
};

const MarkdownBlock: FC<SlateElementProps> = ({ attributes, children }) => {
  return (
    <div
      className="text-slate-900 text-sm font-[jetBrainsMono]"
      {...attributes}
    >
      {children}
    </div>
  );
};

const Bookmark: FC<SlateElementProps> = ({ attributes, children, element }) => {
  return (
    <div className="mb-3">
      <a
        href={element.link}
        className="text-sm font-medium mt-3 mb-3 underline cursor-pointer pointer-events-auto"
        {...attributes}
      >
        {children}
      </a>
    </div>
  );
};

const Headline: FC<SlateElementProps> = ({ attributes, children, element }) => {
  return (
    <h1 className="text-xl font-medium mt-3 mb-2" {...attributes}>
      {children}
    </h1>
  );
};

const CheckBox: FC<SlateElementProps> = ({
  attributes,
  children,
  element,
  setRichText,
  handleSaveEditor,
}) => {
  const editor = useSlateStatic();

  return (
    <div className="flex gap-2 items-center pl-2 my-1" {...attributes}>
      <span contentEditable={false} className="mr-1">
        <input
          type="checkbox"
          checked={element.checked ? element.checked : false}
          onChange={(event) => {
            //const path = editor.selection?.anchor.path;
            const path = ReactEditor.findPath(editor, element);

            const newProperties: Partial<MySlateElement> = {
              checked: event.target.checked,
            };
            Transforms.setNodes(editor, newProperties, { at: path });
            if (setRichText) setRichText(JSON.stringify(editor.children));
            if (handleSaveEditor) handleSaveEditor();
          }}
        />
      </span>
      <span
        contentEditable={true}
        suppressContentEditableWarning
        className="flex text-sm"
      >
        {children}
      </span>
    </div>
  );
};
