import Head from "next/head";
import { ExtendedRecordMap } from "notion-types";
import Layout from "../../client/components/00_Marketing/Layout";
import NotionPage from "../../client/components/00_Marketing/NotionPage";
import { privacyPageId } from "../../client/notion/config";
import notion from "../../client/notion/notion";

export const getStaticProps = async () => {
  const pageId = privacyPageId;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 900, // every 15min
  };
};

export default function PrivacyPage({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy policy of Zirkular" />
      </Head>
      <Layout>
        <NotionPage recordMap={recordMap} rootPageId={privacyPageId} />
      </Layout>
    </>
  );
}
