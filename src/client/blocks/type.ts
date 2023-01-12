import { Extension } from "../graphql/types.generated";

export interface BlockProps {
  extension: Extension;
  size: 1 | 2 | 3;
  isEditable: boolean;
}
