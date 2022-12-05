import { useRegisterActions } from "kbar";
import { useRecoilState } from "recoil";
import { editorMarkdownState } from "../../../../store/ui/editor";

export default function useMarkdownActions() {
  // markdown toggle recoil state
  const [, setEditorMarkdownState] = useRecoilState(editorMarkdownState);

  useRegisterActions([
    {
      id: "markdownView",
      name: "Change markdown view...",
      keywords: "markdown editor setting disable enable",
      section: "Preferences",
    },
    {
      id: "enableMarkdown",
      name: "Enable markdown",
      keywords: "markdown enable",
      section: "",
      perform: () => setEditorMarkdownState(true),
      parent: "markdownView",
    },
    {
      id: "disableMarkdown",
      name: "Disable",
      keywords: "markdown disable",
      section: "",
      perform: () => setEditorMarkdownState(false),
      parent: "markdownView",
    },
  ]);
}
