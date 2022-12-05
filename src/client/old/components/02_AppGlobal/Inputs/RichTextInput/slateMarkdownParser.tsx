import { Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { CustomElement, CustomText } from ".";
import { slateElementType } from "./slateElements";

//----------------------------------------Slate To Markdown----------------------------------------

export const serializeToMarkdown = (slateObj: CustomElement[]) => {
  return slateObj.map((n) => serialize(n)).join("\n");
};

const serialize = (element: CustomElement) => {
  let serializedLine = "";
  if (element.type) {
    //make element type markdown

    switch (element.type) {
      case "headline":
        serializedLine = serializeHeadline(element);
        break;
      case "check-box":
        serializedLine = serializeCheckBox(element);
        break;
      case "code_block":
        serializedLine = serializeCodeBlock(element);
        break;
      case "bookmark":
        serializedLine = serializeBookMarkBlock(element);
        break;
      case "paragraph":
        serializedLine = serializeParagraphBlock(element);
        break;
      default:
        break;
    }
  }
  return serializedLine;
};

//headline
const serializeHeadline = (block: CustomElement) => {
  let blockNotation = "# ";

  block.children.map((n: CustomText) => {
    //make mark type markdown
    blockNotation += getMarkdownMarks(n);
    blockNotation += n.text;
    blockNotation += getMarkdownMarks(n);
  });

  return blockNotation;
};

//paragraph
const serializeParagraphBlock = (block: CustomElement) => {
  let blockNotation = "";
  block.children.map((n: CustomText) => {
    //make mark type markdown
    blockNotation += getMarkdownMarks(n);
    blockNotation += n.text;
    blockNotation += getMarkdownMarks(n);
  });

  return blockNotation;
};

//checkbox
const serializeCheckBox = (block: CustomElement) => {
  let blockNotation = block.checked ? "- [x] " : "- [ ] ";
  block.children.map((n: CustomText) => {
    blockNotation += n.text;
  });

  return blockNotation;
};

//code block
const serializeCodeBlock = (block: CustomElement) => {
  let blockNotation = "```\n";
  block.children.map((n: CustomText) => {
    blockNotation += n.text;
  });
  blockNotation += "\n```";

  return blockNotation;
};

//bookmark
const serializeBookMarkBlock = (block: CustomElement) => {
  //[title](https://www.example.com)
  let blockNotation = "[";
  block.children.map((n: CustomText) => {
    blockNotation += n.text;
  });
  blockNotation += "](";
  blockNotation += block.link;
  blockNotation += ")";

  return blockNotation;
};

const getMarkdownMarks = (block: CustomText) => {
  let blockMarks = "";
  Object.keys(block).map((keys) => {
    //add prenotation
    if (keys === "bold") blockMarks += "*";
    if (keys === "italic") blockMarks += "_";
    if (keys === "strike_through") blockMarks += "~";
    if (keys === "code") blockMarks += "`";
  });

  return blockMarks;
};

//----------------------------------------Markdown To Slate----------------------------------------

export const deserializeToSlate = (markdown: string) => {
  const markdownArr = markdown.split("\n");
  const cleanArr = cleanupCodeBlock(markdownArr);
  const slateArr = convertToSlateElements(cleanArr);
  return slateArr;
};

const cleanupCodeBlock = (arr: string[]) => {
  const newCleanedArr: string[] = [];
  let newCodeBlock = "";
  let isFinished = true;
  arr.map((n) => {
    if (n.includes("```")) {
      if (isFinished) {
        newCodeBlock = "``` " + n.replace("```", "");
        isFinished = false;
      } else {
        newCodeBlock += n.replace("```", "");
        newCleanedArr.push(newCodeBlock);
        newCodeBlock = "";
        isFinished = true;
      }
    } else {
      if (!isFinished) {
        newCodeBlock += newCodeBlock.replace("``` ", "") !== "" ? "\n" + n : n;
      } else {
        newCleanedArr.push(n);
      }
    }
  });
  return newCleanedArr;
};

const regExTable = {
  headline: new RegExp(/^# (.*$)/),
  bookmark: new RegExp(/^\[(.+)\]\(((?:\/|https?:\/\/)[\w\d.\-:/?=#]+)\)$/),
  code_block: new RegExp(/^``` (.*$)/gm),
  check_box: new RegExp(/^- \[[ x]] (.*$)/),
};

const convertToSlateElements = (arr: string[]) => {
  const slateElemArr: CustomElement[] = [];

  interface getElemType {
    type: slateElementType;
    match: RegExpMatchArray | null;
    children: CustomText[];
  }

  arr.map((n) => {
    const { type, match, children }: getElemType = getElementType(n);

    switch (type) {
      case "headline":
        slateElemArr.push(deserializeHeadlineBlock(n, children));
        break;
      case "check-box":
        slateElemArr.push(deserializeCheckBoxBlock(n));
        break;
      case "code_block":
        slateElemArr.push(deserializeCodeBlock(n));
        break;
      case "bookmark":
        if (match) {
          slateElemArr.push(deserializeBookMarkBlock(match[1], match[2]));
        }
        break;
      default:
        slateElemArr.push({
          type: "paragraph",
          children: children,
        });
        break;
    }
  });
  return slateElemArr;
};

const deserializeHeadlineBlock = (str: string, children: CustomText[]) => {
  const headlineObj: CustomElement = {
    type: "headline",
    children: children,
  };
  return headlineObj;
};

const deserializeCheckBoxBlock = (str: string) => {
  const checkBoxObj: CustomElement = {
    type: "check-box",
    checked: str.includes("- [x] ") ? true : false,
    children: [{ text: str.replace("- [ ] ", "").replace("- [x] ", "") }],
  };
  return checkBoxObj;
};

const deserializeCodeBlock = (str: string) => {
  const codeBlockObj: CustomElement = {
    type: "code_block",
    children: [{ text: str.replace("``` ", "") }],
  };
  return codeBlockObj;
};

const deserializeBookMarkBlock = (text: string, link: string) => {
  console.log(text, link);
  const bookmarkObj: CustomElement = {
    type: "bookmark",
    link: link,
    children: [{ text: text }],
  };
  return bookmarkObj;
};

const getElementType = (elem: string) => {
  if (elem.match(regExTable.headline)) {
    return {
      type: "headline" as slateElementType,
      match: elem.match(regExTable.headline),
      children: getChildrenMarkObj(elem.slice(2)),
    };
  } else if (elem.match(regExTable.check_box)) {
    return {
      type: "check-box" as slateElementType,
      match: elem.match(regExTable.check_box),
      children: getChildrenMarkObj(elem),
    };
  } else if (elem.match(regExTable.code_block)) {
    return {
      type: "code_block" as slateElementType,
      match: elem.match(regExTable.code_block),
      children: getChildrenMarkObj(elem),
    };
  } else if (elem.match(regExTable.bookmark)) {
    return {
      type: "bookmark" as slateElementType,
      match: elem.match(regExTable.bookmark),
      children: getChildrenMarkObj(elem),
    };
  } else {
    return {
      type: "paragraph" as slateElementType,
      match: null,
      children: getChildrenMarkObj(elem),
    };
  }
};

const getChildrenMarkObj = (elem: string) => {
  const arr: CustomText[] = [];
  const markerStates = {
    isBold: false,
    isItalic: false,
    isStrikeThrough: false,
    isCode: false,
  };

  const recursiveParser = (n: string) => {
    const regEx = new RegExp(/(\*|~|`|_)/);
    const match = n.match(regEx);
    if (match !== null) {
      //mark is there
      const slice = n.slice(0, match.index);
      //load the array with the text until a mark change
      n = n.slice(match.index);
      arr.push({ text: slice });

      while (n.charAt(0).match(new RegExp(/(\*|~|`|_)/))) {
        const charMatch = n.charAt(0).match(new RegExp(/(\*|~|`|_)/));
        if (charMatch) {
          switch (getMarkType(n.charAt(0))) {
            case "bold":
              markerStates.isBold = markerStates.isBold ? false : true;
              if (!markerStates.isBold) arr[arr.length - 1].bold = true;
              break;
            case "italic":
              markerStates.isItalic = markerStates.isItalic ? false : true;
              if (!markerStates.isItalic) arr[arr.length - 1].italic = true;
              break;
            case "strike_through":
              markerStates.isStrikeThrough = markerStates.isStrikeThrough
                ? false
                : true;
              if (!markerStates.isStrikeThrough)
                arr[arr.length - 1].strike_through = true;
              break;
            case "code":
              markerStates.isCode = markerStates.isCode ? false : true;
              if (!markerStates.isCode) arr[arr.length - 1].code = true;
              break;
            default:
              break;
          }
          n = n.slice(1);
        }
      }
      recursiveParser(n);
    } else {
      arr.push({ text: n });
      return null;
    }
  };
  recursiveParser(elem);
  return arr;
};

const getMarkType = (mark: string) => {
  if (mark.includes("*")) return "bold";
  if (mark.includes("_")) return "italic";
  if (mark.includes("`")) return "code";
  if (mark.includes("~")) return "strike_through";
};

export const getMarkdownFromEditor = (editor: ReactEditor) => {
  //get markup nodes
  const editorNodes: Descendant[] = editor.children;

  //get markdown string
  let markdown = "";
  editorNodes.map((node, i) => {
    //@ts-ignore
    markdown += node.children[0].text;
    if (editorNodes.length < i) {
      markdown += "\n";
    }
  });
  return markdown;
};
