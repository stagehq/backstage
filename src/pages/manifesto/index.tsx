import Head from "next/head";
import { ExtendedRecordMap } from "notion-types";
import Layout from "../../client/components/00_Marketing/Layout";
import NotionPage from "../../client/components/00_Marketing/NotionPage";
import { manifestoPageId } from "../../client/notion/config";
import notion from "../../client/notion/notion";

export const getStaticProps = async () => {
  const pageId = manifestoPageId;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 900, // every 15min
  };
};

export default function ManifestoPage({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return (
    <>
      <Head>
        <title>Manifesto</title>
        <meta name="description" content="Manifesto of Zirkular" />
      </Head>
      <Layout>
        <NotionPage recordMap={recordMap} rootPageId={manifestoPageId} />
      </Layout>
    </>
  );
}
