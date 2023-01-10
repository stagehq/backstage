import { PrismaClient } from "@prisma/client";
import { Site } from "../client/graphql/types.generated";

const SitePage: React.FC<{ site: string }> = ({ site }) => {
  // Render the page using the site data
  const data: Site = JSON.parse(site);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
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
      extensions: true,
    },
  });
  const site = JSON.stringify(sitedata);
  return {
    // Passed to the page component as props
    props: {
      site: site,
      revalidate: 10,
    },
  };
}

export default SitePage;
