import { PrismaClient } from "@prisma/client";
import { RecoilRoot } from "recoil";
import SitePage from "../client/components/isr/SitePage";

const Page: React.FC<{ data: string }> = (props) => {
  const data = JSON.parse(props.data);
  console.log(data);
  return (
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    <RecoilRoot>
      <SitePage data={data} />
    </RecoilRoot>
  );
};

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const sites = await prisma.site.findMany({
    select: {
      subdomain: true,
    },
  });
  const paths = sites.map((site) => ({
    params: { id: site.subdomain },
  }));

  return { paths, fallback: "blocking" };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(params: { params: { id: string } }) {
  const prisma = new PrismaClient();
  const sitedata = await prisma.site.findFirst({
    where: {
      subdomain: params.params.id,
    },
    include: {
      extensions: {
        include: {
          storeExtension: true,
          underlayingApis: {
            include: {
              apiConnector: true,
              apiResponses: true,
            },
          },
        },
      },
    },
  });
  const site = JSON.stringify(sitedata);
  return {
    // Passed to the page component as props
    props: {
      data: site,
      revalidate: 10,
    },
  };
}

export default Page;
