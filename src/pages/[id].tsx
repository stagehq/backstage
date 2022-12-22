import { PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../client/graphql/client'
import { GetAllSitesDocument } from '../client/graphql/getAllSites.generated'
import { GetSiteDocument } from '../client/graphql/getSite.generated'
import { Site } from '../client/graphql/types.generated'


const SitePage: React.FC<{ site: Site }> = ({ site }) => {
  // Render the page using the site data
  console.log(site);
  return <div>Site: {site.subdomain}</div>;
};

export async function getStaticProps({ params }) {
  console.log(client)
  return {
    props: {
      site: await client.query(GetSiteDocument, { subdomain: params.id }).toPromise(),
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const subdomains = await client.query(GetAllSitesDocument).toPromise();
  const data = subdomains.data.map((site: Site) => site.subdomain)
  const paths = data.map((subdomain: string) => ({ 
    params: { id: subdomain }
  }))

  // const prisma = new PrismaClient();
  // const subdomains = await prisma.site.findMany();
  // const paths = subdomains.map((site: Site) => ({
  //   params: { id: site.subdomain }
  // }))

  return { paths, fallback: 'blocking' }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const subdomains = await client.query(GetAllSitesDocument).toPromise();
//   const data = subdomains.data.map((site: Site) => site.subdomain)
//   return {
//     paths: data.map((subdomain: string) => `/${subdomain}`) || [],
//     fallback: 'blocking',
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   return {
//     props: {
//       site: await client.query(GetSiteDocument, { subdomain: params?.id }).toPromise(),
//     },
//     revalidate: 10,
//   }
// }

export default SitePage
