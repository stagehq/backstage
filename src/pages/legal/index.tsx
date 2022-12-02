import Head from "next/head";
import { ExtendedRecordMap } from "notion-types";
import Layout from "../../client/components/00_Marketing/Layout";
import NotionPage from "../../client/components/00_Marketing/NotionPage";
import { legalPageId } from "../../client/notion/config";
import notion from "../../client/notion/notion";

export const getStaticProps = async () => {
  const pageId = legalPageId;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 900, // every 15min
  };
};

export default function LegalPage({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return (
    <>
      <Head>
        <title>Legal Notice</title>
        <meta name="description" content="Legal notice of Zirkular" />
      </Head>
      <Layout>
        <NotionPage recordMap={recordMap} rootPageId={legalPageId} />
      </Layout>
    </>
  );
}
