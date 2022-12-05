import isHotkey from "is-hotkey";
import {
  Editor,
  Element as SlateElement,
  Point,
  Range,
  Transforms,
} from "slate";
import { ReactEditor } from "slate-react";
import { CustomText } from ".";
import { User } from "../../../../graphql/types.generated";
import { MentionState } from "./inputShell/mentionsDropdown";
import { blockMarkdownTable, slateElementType } from "./slateElements";
import { leafMarkdownTable, LeafType } from "./slateLeafs";

//----------------------------------------Mark Format------------------------------------

//toggle format with shortcuts
export const toggleFormat = (
  editor: ReactEditor,
  format: LeafType,
  isMarkdown: boolean
) => {
  const isActive = isMarkActive(editor, format);

  if (!isMarkdown) {
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  } else {
    const notation = leafMarkdownTable.find(
      (leaf) => leaf.type === format
    )?.notation;
    if (editor.selection) {
      const regEx = new RegExp("(\\" + notation + ")*(\\" + notation + ")");
      const testStr = Editor.string(editor, {
        anchor: {
          path: Range.start(editor.selection).path,
          offset: Range.start(editor.selection).offset - 1,
        },
        focus: {
          path: Range.end(editor.selection).path,
          offset: Range.end(editor.selection).offset + 1,
        },
      });
      if (testStr.match(regEx)) {
        editor.apply({
          type: "remove_text",
          path: Range.end(editor.selection).path,
          text: notation ? notation : "",
          offset: Range.end(editor.selection).offset,
        });
        editor.apply({
          type: "remove_text",
          path: Range.start(editor.selection).path,
          text: notation ? notation : "",
          offset: Range.start(editor.selection).offset - 1,
        });
      } else {
        editor.apply({
          type: "insert_text",
          path: Range.end(editor.selection).path,
          text: notation ? notation : "",
          offset: Range.end(editor.selection).offset,
        });
        editor.apply({
          type: "insert_text",
          path: Range.start(editor.selection).path,
          text: notation ? notation : "",
          offset: Range.start(editor.selection).offset,
        });
        Transforms.select(editor, {
          anchor: {
            path: Range.start(editor.selection).path,
            offset: Range.start(editor.selection).offset,
          },
          focus: {
            path: Range.end(editor.selection).path,
            offset: Range.end(editor.selection).offset - 1,
          },
        });
      }
    }
  }
};

//check if format is already applied
export const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks: Omit<CustomText, "text"> | null = Editor.marks(editor);
  return marks
    ? Object.keys(marks).find((e) => e === format) === undefined
      ? false
      : true
    : false;
};

//get format
export const getMarks = (editor: ReactEditor) => {
  const marks: Omit<CustomText, "text"> | null = Editor.marks(editor);
  return marks;
};

//----------------------------------------Blocks----------------------------------------

//delete Block
export const deleteBlock = (editor: ReactEditor) => {
  const newProperties: Partial<SlateElement> = {
    type: "paragraph",
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);
};

//toggle Block with buttons
export const toggleBlock = (
  editor: ReactEditor,
  format: slateElementType,
  isMarkdown: boolean
) => {
  const isActive = isBlockActive(editor, format);

  if (!isMarkdown) {
    const newProperties: Partial<SlateElement> = {
      type: isActive ? "paragraph" : format,
    };
    Transforms.setNodes<SlateElement>(editor, newProperties);
  } else {
    const notation = blockMarkdownTable.find(
      (block) => block.type === format
    )?.notation;
    const offset = blockMarkdownTable.find(
      (block) => block.type === format
    )?.focus;
    if (editor.selection && offset !== undefined) {
      editor.apply({
        type: "insert_text",
        path: Range.end(editor.selection).path,
        text: notation ? notation : "",
        offset: Range.end(editor.selection).offset,
      });
      Transforms.move(editor, {
        distance: offset,
        unit: "offset",
        reverse: true,
      });
    }
  }
};

//check if block is already applied
export const isBlockActive = (
  editor: ReactEditor,
  format: slateElementType
) => {
  const { selection } = editor;
  const blockType = "type";
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );
  return !!match;
};

//get type
export const getBlock = (editor: ReactEditor) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n),
    })
  );
  return match[0];
};

//----------------------------------------Handle Enter----------------------------------------

export const handleEnter = (editor: ReactEditor) => {
  //@ts-ignore
  if (getBlock(editor).children[0].text === "") {
    //deleteBlock(editor);
  }
};

//----------------------------------------Handle Blocks----------------------------------------

//change block format to paragraph on backwards delete
export const withCustomMiddleWare = (editor: ReactEditor) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type !== "paragraph",
        })
      );
      if (match) {
        const [, path] = match;
        const start = Editor.start(editor, path);
        if (Point.equals(selection.anchor, start)) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type !== "paragraph",
          });
          return;
        }
      }
    }

    deleteBackward(...args);

    //mention delete
    if (getMarks(editor)?.mention) {
      if (editor.selection) {
        const node = Editor.leaf(editor, editor.selection?.anchor);
        if (node[0].mention) {
          const start = Editor.start(editor, node[1]);
          const end = Editor.end(editor, node[1]);
          Transforms.setSelection(editor, { anchor: start, focus: end });
          Editor.removeMark(editor, "mention");
        }
      }
    }
  };

  editor.insertBreak = () => {
    //console.log("enter removed");
  };
  editor.insertSoftBreak = () => {
    //console.log("enter removed");
  };
  // editor.insertData = (data: DataTransfer) => {
  //   console.log(data);
  //   // const { type, fragment } = data;
  // };

  return editor;
};

//----------------------------------------Custom Enter Handler----------------------------------------

export function onKeyDown(
  e: React.KeyboardEvent,
  editor: ReactEditor,
  isMarkActive: boolean,
  mention: MentionState
) {
  if (mention.search === "") {
    if (e.key === "Enter") {
      if (e.key === "Enter" && e.shiftKey) {
        return editor.insertText("\n");
      } else {
        if (!isMarkActive) {
          Transforms.splitNodes(editor, {
            always: true,
          });
        } else {
          return editor.insertText("\n");
        }
      }
    }
  }
}

//----------------------------------------Custom Paste Handler----------------------------------------

export const withHtml = (editor: ReactEditor) => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    const text = data.getData("text");

    if (text) {
      if (isValidHttpUrl(text) === false) {
        const fragment = [{ text: text }];
        //@ts-ignore
        Transforms.insertFragment(editor, fragment);
        return;
      } else {
        const newProperties: Partial<SlateElement> = {
          type: "bookmark",
          link: text,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties);
      }
    }

    insertData(data);
  };

  return editor;
};

function isValidHttpUrl(pastedUrl: string) {
  let url;

  try {
    url = new URL(pastedUrl);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

//----------------------------------------Custom Placeholder----------------------------------------

export const getPlaceholder = (
  editor: ReactEditor,
  initalPlaceholder: string
) => {
  const block = getBlock(editor);

  //@ts-ignore
  const type: slateElementType = block.type;

  switch (type) {
    case "check-box":
      return "Check box";
    case "code_block":
      return "Code block";
    case "bookmark":
      return "Enter a link";
    case "headline":
      return "Headline";
    case "paragraph":
      if (
        JSON.stringify(editor.children) ===
        '[{"type":"paragraph","children":[{"text":""}]}]'
      ) {
        return initalPlaceholder;
      } else {
        return "";
      }
    default:
      return "";
  }
};

//----------------------------------------Custom Placeholder----------------------------------------

export const moveToStartOfBlock = (editor: ReactEditor) => {
  if (editor.selection) {
    Transforms.select(editor, {
      path: editor.selection?.anchor.path,
      offset: 0,
    });
  }
};

//----------------------------------------Mentions Handler----------------------------------------

const MENTIONKEYS: {
  [key: string]: string;
} = {
  arrowdown: "down",
  arrowup: "up",
  enter: "enter",
  esc: "esc",
};

export const handleMentions = (
  editor: ReactEditor,
  mention: MentionState,
  users: User[]
) => {
  if (editor.selection) {
    const [start] = Range.edges(editor.selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const before = wordBefore && Editor.before(editor, wordBefore);
    const beforeRange = before && Editor.range(editor, before, start);
    const beforeText = beforeRange && Editor.string(editor, beforeRange);
    const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
    const after = Editor.after(editor, start);
    const afterRange = Editor.range(editor, start, after);
    const afterText = Editor.string(editor, afterRange);
    const afterMatch = afterText.match(/^(\s|$)/);

    if (beforeMatch && afterMatch) {
      return {
        target: beforeRange,
        search: beforeMatch[1],
        index: 0,
        filteredUsers: filterUser(users, beforeMatch[1]),
      };
    } else {
      return {
        target: undefined,
        search: "",
        index: 0,
        filteredUsers: mention.filteredUsers,
      };
    }
  } else {
    return {
      target: undefined,
      search: "",
      index: 0,
      filteredUsers: mention.filteredUsers,
    };
  }
};

const filterUser = (users: User[], search: string) => {
  const filteredUsers = users
    .filter((c) => c.alias?.toLowerCase().startsWith(search.toLowerCase()))
    .slice(0, 10);
  return filteredUsers;
};

export const onMentionKeyDown = (
  e: React.KeyboardEvent,
  mention: MentionState,
  editor: ReactEditor,
  setMention: (value: MentionState) => void
) => {
  if (mention.search !== "") {
    for (const hotkey in MENTIONKEYS) {
      if (isHotkey(hotkey, e as React.KeyboardEvent)) {
        e.preventDefault();
        const action: string = MENTIONKEYS[hotkey];
        switch (action) {
          case "down":
            setMention({
              target: mention.target,
              index: (mention.index =
                mention.index >= mention.filteredUsers.length - 1
                  ? 0
                  : mention.index + 1),
              search: mention.search,
              filteredUsers: mention.filteredUsers,
            });
            break;
          case "up":
            setMention({
              target: mention.target,
              index: (mention.index =
                mention.index <= 0
                  ? mention.filteredUsers.length - 1
                  : mention.index - 1),
              search: mention.search,
              filteredUsers: mention.filteredUsers,
            });
            break;
          case "esc":
            setMention({
              target: mention.target,
              index: mention.index,
              search: "",
              filteredUsers: mention.filteredUsers,
            });
            break;
          case "enter":
            setMention({
              target: mention.target,
              index: mention.index,
              search: "",
              filteredUsers: mention.filteredUsers,
            });
            insertMentionsLeaf(editor, mention);
            break;
        }
      }
    }
  }
};

const insertMentionsLeaf = (editor: ReactEditor, mention: MentionState) => {
  const selectedUser = mention.filteredUsers[mention.index].alias;
  if (editor.selection) {
    const [start] = Range.edges(editor.selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const before = wordBefore && Editor.before(editor, wordBefore);
    const beforeRange = before && Editor.range(editor, before, start);

    if (selectedUser && beforeRange) {
      Transforms.setSelection(editor, beforeRange);
      Editor.addMark(editor, "mention", true);
      Transforms.insertText(editor, "@" + selectedUser);

      Transforms.insertText(editor, " ");
      Transforms.setSelection(editor, {
        anchor: {
          path: editor.selection.anchor.path,
          offset: editor.selection.anchor.offset - 1,
        },
        focus: editor.selection.focus,
      });
      Editor.removeMark(editor, "mention");
      Transforms.setSelection(editor, {
        anchor: editor.selection.focus,
        focus: editor.selection.focus,
      });
    }
    console.log(editor.children);
  }
};
