import { ExtendedRecordMap } from "notion-types";
import { rootNotionPageId } from "../../client/notion/config";
import notion from "../../client/notion/notion";
import NotionPage from "../../client/_old/components/00_Marketing/NotionPage";

export const getStaticProps = async (context: {
  params: { pageId: string };
}) => {
  const pageId = (context.params.pageId as string) || rootNotionPageId;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 900, // every 15min
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId} />;
}
