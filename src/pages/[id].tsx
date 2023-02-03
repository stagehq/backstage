import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import SitePage from "../client/components/isr/SitePage";
import { siteSlugState } from "../client/store/site";

const Page = () => {
  //const initialSite: Site = JSON.parse(data);

  const router = useRouter();
  const { id } = router.query;
  const [, setSiteSlug] = useRecoilState(siteSlugState);

  useEffect(() => {
    if (id && typeof id === "string") {
      setSiteSlug(id);
    }
  }, [id, setSiteSlug]);

  return (
    <Suspense fallback={<div></div>}>
      <SitePage />
    </Suspense>
  );
};

// export async function getStaticPaths() {
//   const prisma = new PrismaClient();
//   const sites = await prisma.site.findMany({
//     select: {
//       subdomain: true,
//     },
//   });
//   const paths = sites.map((site) => ({
//     params: { id: site.subdomain },
//   }));

//   return { paths, fallback: "blocking" };
// }

// // `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps(params: { params: { id: string } }) {
//   const prisma = new PrismaClient();
//   const sitedata = await prisma.site.findFirst({
//     where: {
//       subdomain: params.params.id,
//     },
//     include: {
//       extensions: {
//         include: {
//           storeExtension: true,
//           underlayingApis: {
//             include: {
//               apiConnector: true,
//               apiResponses: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   const site = JSON.stringify(sitedata);
//   return {
//     // Passed to the page component as props
//     props: {
//       data: site,
//       revalidate: 10,
//     },
//   };
// }

export default Page;
