import useResizeObserver from "@react-hook/resize-observer";
import isHotkey from "is-hotkey";
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import { BaseEditor, createEditor, Descendant, Editor, Range } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { User } from "../../../../graphql/types.generated";
import { editorMarkdownState } from "./../../../../store/ui/editor";
import InputShell from "./inputShell";
import MentionsDropdown, { MentionState } from "./inputShell/mentionsDropdown";
import { SlateElement, slateElementType } from "./slateElements";
import {
  getPlaceholder,
  handleMentions,
  onKeyDown,
  onMentionKeyDown,
  toggleFormat,
  withCustomMiddleWare,
  withHtml,
} from "./slateHelper";
import { initialValue } from "./slateInitialValue";
import { Leaf } from "./slateLeafs";
import {
  deserializeToSlate,
  getMarkdownFromEditor,
  serializeToMarkdown,
} from "./slateMarkdownParser";

export type hotKeyType = "bold" | "italic" | "strike_through" | "code";

const HOTKEYS: {
  [key: string]: hotKeyType;
} = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+-": "strike_through",
  "mod+=": "code",
};

export type CustomElement = {
  type: slateElementType;
  link?: string;
  children: CustomText[];
  checked?: boolean;
};
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strike_through?: boolean;
  code?: boolean;
  mention?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface RichTextInputProps {
  setRichText: (value: string) => void;
  handleSaveEditor?: () => void;
  handleSend?: () => void;
  users: User[];
  containerSize: "big" | "small" | "one-line" | number;
  readOnly: boolean;
  customInitialValue?: string;
  initialPlaceholder?: string;
  withSendButton: boolean;
  sendButtonText?: string;
  isNewInputField: boolean;
}

//sizeObserver
const useSize = (target: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState<{
    rect: DOMRect | undefined;
    pos: { top: number; left: number };
  }>();

  useLayoutEffect(() => {
    setSize({
      rect: target.current ? target.current.getBoundingClientRect() : undefined,
      pos: {
        top: target.current ? target.current.offsetTop : 0,
        left: target.current ? target.current.offsetLeft : 0,
      },
    });
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) =>
    setSize({
      rect: entry.contentRect,
      pos: {
        top: target.current ? target.current.offsetTop : 0,
        left: target.current ? target.current.offsetLeft : 0,
      },
    })
  );
  return size;
};

const RichTextInput: FC<RichTextInputProps> = ({
  setRichText,
  handleSaveEditor,
  users,
  containerSize,
  readOnly,
  customInitialValue,
  initialPlaceholder,
  withSendButton,
  sendButtonText,
  handleSend,
  isNewInputField,
}) => {
  const target = useRef<HTMLDivElement>(null);
  const size = useSize(target);

  //mentions
  const [mention, setMention] = useState<MentionState>({
    index: 0,
    search: "",
    target: undefined,
    filteredUsers: users,
  });

  const editor = useMemo(
    () =>
      withHtml(withCustomMiddleWare(withHistory(withReact(createEditor())))),
    []
  );

  const markdownState = useRecoilValue(editorMarkdownState);

  //render function
  const renderElement = useCallback((props) => {
    return (
      <SlateElement
        {...props}
        setRichText={setRichText}
        handleSaveEditor={handleSaveEditor}
      />
    );
  }, []);

  const renderLeaf = useCallback(
    (props) => {
      if (props.leaf.placeholder) {
        //if block is empty
        return (
          <div className="relative">
            <Leaf {...props} />
            <span
              className="text-slate-400 pointer-events-none absolute top-0 w-max"
              contentEditable={false}
            >
              {getPlaceholder(
                editor,
                initialPlaceholder ? initialPlaceholder : "Enter text ..."
              )}
            </span>
          </div>
        );
      } else if (
        JSON.stringify(editor.children) ===
        '[{"type":"paragraph","children":[{"text":""}]}]'
      ) {
        //only when empty
        return (
          <div className="relative">
            <Leaf {...props} />
            <span
              className="text-slate-400 pointer-events-none absolute top-0 w-max"
              contentEditable={false}
            >
              {initialPlaceholder}
            </span>
          </div>
        );
      }
      //normal
      return <Leaf {...props} />;
    },
    [editor]
  );

  useEffect(() => {
    //console.log("change view");
    if (readOnly && markdownState) {
      //@ts-ignore
      if (editor.children[0].type === "markdown") {
        //console.log("need to change to slate");
        const markdown = getMarkdownFromEditor(editor);
        const slateObj = deserializeToSlate(markdown);
        editor.children.map((node) => {
          editor.apply({ type: "remove_node", path: [0], node });
        });
        slateObj.map((node, i) => {
          editor.apply({ type: "insert_node", path: [i], node });
        });
      }
    }
    if (!readOnly && markdownState) {
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
  }, [readOnly]);

  //console.log("state value:", customInitialValue);

  const getValue = (value: string) => {
    return value ? JSON.parse(value) : initialValue;
  };

  return (
    <div ref={target}>
      <Slate
        editor={editor}
        value={getValue(customInitialValue ? customInitialValue : "")}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          //console.log(value);
          //console.log(editor.children);
          if (isAstChange) {
            // Save the value to Local Storage.
            if (!markdownState) {
              setRichText(JSON.stringify(value));
              //console.log("save:", value);
            } else {
              //@ts-ignore
              if (value[0].type === "markdown") {
                const markdown = getMarkdownFromEditor(editor);
                const slateObj = deserializeToSlate(markdown);
                //console.log(slateObj);
                setRichText(JSON.stringify(slateObj));
                //console.log("save:", slateObj);
              } else {
                setRichText(JSON.stringify(value));
                //console.log("save:", value);
              }
            }
            setMention(handleMentions(editor, mention, users));
          }
        }}
      >
        <InputShell
          size={containerSize}
          readOnly={readOnly}
          withSendButton={withSendButton}
          sendButtonText={sendButtonText}
          handleSaveEditor={handleSaveEditor}
          handleSend={handleSend}
          isNewInputField={isNewInputField}
        >
          <MentionsDropdown
            open={mention.target ? true : false}
            mention={mention}
            editorSize={size}
          />
          <Editable
            className="h-full"
            readOnly={readOnly}
            decorate={([node, path]) => {
              if (editor.selection != null) {
                if (
                  !Editor.isEditor(node) &&
                  Editor.string(editor, [path[0]]) === "" &&
                  Range.includes(editor.selection, path) &&
                  Range.isCollapsed(editor.selection)
                ) {
                  return [
                    {
                      ...editor.selection,
                      placeholder: true,
                    },
                  ];
                }
              }
              return [];
            }}
            renderElement={renderElement}
            renderLeaf={markdownState ? undefined : renderLeaf}
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as React.KeyboardEvent)) {
                  event.preventDefault();
                  const format: hotKeyType = HOTKEYS[hotkey];
                  toggleFormat(editor, format, markdownState);
                }
              }
              onKeyDown(event, editor, markdownState, mention);
              onMentionKeyDown(event, mention, editor, setMention);
            }}
          />
        </InputShell>
      </Slate>
    </div>
  );
};
export default RichTextInput;
