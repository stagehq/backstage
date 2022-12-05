import { useRegisterActions } from "kbar";
import { useRecoilState } from "recoil";
import { themeState } from "../../../../store/ui/theme";

export default function useThemeActions() {
  // recoil theme state
  const [, setThemeState] = useRecoilState(themeState);

  useRegisterActions([
    {
      id: "theme",
      name: "Change theme…",
      keywords: "interface color dark light",
      section: "Preferences",
    },
    {
      id: "darkTheme",
      name: "Dark",
      keywords: "dark theme",
      section: "",
      perform: () => setThemeState("dark"),
      parent: "theme",
    },
    {
      id: "lightTheme",
      name: "Light",
      keywords: "light theme",
      section: "",
      perform: () => setThemeState("light"),
      parent: "theme",
    },
  ]);
}
