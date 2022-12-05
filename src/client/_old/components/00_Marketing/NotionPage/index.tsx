// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import { NotionRenderer } from "react-notion-x";

// used for code syntax highlighting (optional)
// import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
// import 'katex/dist/katex.min.css'

export default function NotionPage({
  recordMap,
  rootPageId,
}: {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
}) {
  if (!recordMap) {
    return null;
  }

  const title = getPageTitle(recordMap);

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      rootPageId={rootPageId}
      components={{
        nextImage: Image,
        nextLink: Link,
      }}
    />
  );
}
