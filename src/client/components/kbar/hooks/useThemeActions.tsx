import { useRegisterActions } from "kbar";
import { useRecoilState } from "recoil";
import { themeState } from "../../../store/ui/theme";

export default function useThemeActions() {
  // recoil theme state
  const [theme, setThemeState] = useRecoilState(themeState);

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
      perform: () => {
        const isDark = theme === "dark";
        setThemeState("dark");
        return () => {
          if (isDark) setThemeState("light");
        };
      },
      parent: "theme",
    },
    {
      id: "lightTheme",
      name: "Light",
      keywords: "light theme",
      section: "",
      perform: () => {
        const isLight = theme === "light";
        setThemeState("light");

        return () => {
          if (isLight) setThemeState("dark");
        };
      },
      parent: "theme",
    },
  ]);
}
