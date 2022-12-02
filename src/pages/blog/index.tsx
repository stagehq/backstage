import { ExtendedRecordMap } from "notion-types";
import NotionPage from "../../client/components/00_Marketing/NotionPage";
import { rootNotionPageId } from "../../client/notion/config";
import notion from "../../client/notion/notion";

export const getStaticProps = async () => {
  const pageId = rootNotionPageId;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 900, // every 15min
  };
};

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId} />;
}
