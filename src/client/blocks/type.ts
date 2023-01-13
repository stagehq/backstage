import { Layouts } from "react-grid-layout";
import { Extension } from "../graphql/types.generated";

export interface BlockProps {
  gridRef: React.RefObject<HTMLDivElement>;
  extension: Extension;
  size: 1 | 2 | 3;
  isEditable: boolean;
}
