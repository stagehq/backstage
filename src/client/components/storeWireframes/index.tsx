import { FC } from "react";
import Devto from "./devto";
import Funnel from "./funnel";
import Github from "./github";
import Gitlab from "./gitlab";
import Linkedin from "./linkedin";
import Spotify from "./spotify";
import WebLinks from "./webLinks";

interface StoreWireframe {
  name: string;
}

const StoreWireframe: FC<StoreWireframe> = ({ name }) => {
  switch (name) {
    case "devto":
      return <Devto />;
    case "funnel":
      return <Funnel />;
    case "github":
      return <Github />;
    case "gitlab":
      return <Gitlab />;
    case "linkedin":
      return <Linkedin />;
    case "spotify":
      return <Spotify />;
    case "webLinks":
      return <WebLinks />;
    default:
      return <Devto />;
  }
};

export default StoreWireframe;
