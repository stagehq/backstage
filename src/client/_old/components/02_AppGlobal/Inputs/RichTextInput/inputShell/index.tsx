import clsx from "clsx";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { ReactEditor, useSlate } from "slate-react";
import { editorFormatBarState } from "../../../../../../store/ui/editor";
import BottomBar from "./bottomBar";
import TopBar from "./topBar";
interface InputShellProps {
  children: React.ReactNode;
  size: "big" | "small" | "one-line" | number;
  readOnly: boolean;
  withSendButton: boolean;
  sendButtonText?: string;
  handleSaveEditor?: () => void;
  handleSend?: () => void;
  isNewInputField: boolean;
}

const InputShell: FC<InputShellProps> = ({
  children,
  size,
  readOnly,
  withSendButton,
  sendButtonText,
  handleSaveEditor,
  handleSend,
  isNewInputField,
}) => {
  const [formatBarState] = useRecoilState(editorFormatBarState);
  const editor = useSlate();
  const tinyView =
    JSON.stringify(editor.children) ===
      '[{"type":"paragraph","children":[{"text":""}]}]' && size === "small"
      ? true
      : false;
  return (
    <div
      className={clsx(
        "rounded-md w-full h-auto flex flex-col relative",
        readOnly
          ? ""
          : "shadow-sm border border-gray-300 focus-within:ring-indigo-600 focus-within:ring-[1.5px]"
      )}
    >
      {formatBarState && !tinyView && !readOnly && <TopBar />}
      <div
        onClick={() => ReactEditor.focus(editor)}
        className={clsx(
          "cursor-text",
          readOnly === true
            ? "h-max"
            : size === "big"
            ? "min-h-[300px] px-3 pt-2"
            : "px-3 pt-2",
          tinyView ? "-mb-[3px]" : ""
        )}
      >
        {children}
      </div>
      {!readOnly && !tinyView && (
        <BottomBar
          withSendButton={withSendButton}
          sendButtonText={sendButtonText}
          handleSend={handleSend}
          tinyView={tinyView}
          isNewInputField={isNewInputField}
        />
      )}
    </div>
  );
};

export default InputShell;
