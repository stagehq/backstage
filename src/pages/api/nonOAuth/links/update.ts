import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";

interface Metadata {
  title: string | null;
  description: string | null;
  favicon: string | null;
  ogImage: string | null;
  mainColor: string | null;
  url: string;
}

/**
 * Get metadata from a URL
 * @param {string} url - The URL to get metadata from
 * @returns {Promise<Metadata>} - The metadata
 * @typedef {Object} Metadata
 * @property {string} title - The title of the page
 * @property {string} description - The description of the page
 * @property {string} favicon - The favicon of the page
 * @property {string} ogImage - The og:image of the page
 * @property {string} mainColor - The main color of the page
 * @property {string} url - The url of the page
 * @example
 * const metadata = await getUrlMetadata("https://github.com");
 * console.log(metadata);
 * // {
 * //   title: "GitHub",
 * //   description: "GitHub is where over 65 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it.",
 * //   favicon: "https://github.githubassets.com/favicon.ico",
 * //   ogImage: "https://github.githubassets.com/images/modules/open_graph/github-mark.png",
 * //   mainColor: "#24292e"
 * // }
 */

const getUrlMetadata = async (url: string): Promise<Metadata> => {
  const domain = new URL(url);
  const response = await wretch(url).get().text();
  const { window } = new JSDOM(response);
  const document = window.document;
  const title = document.querySelector("title")?.textContent || "";
  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content") || null;
  let favicon =
    document
      .querySelector('link[rel="shortcut icon"], link[rel="icon"]')
      ?.getAttribute("href") || null;
    if (favicon && favicon.startsWith("/")) {
      favicon = `${domain.origin}${favicon}`;
    }
  let ogImage =
    document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content") || null;
      if (ogImage && ogImage.startsWith("/")) {
        ogImage = `${domain.origin}${ogImage}`;
      }
  const themeColor = document
    .querySelector('meta[name="theme-color"]')
    ?.getAttribute("content");
  const mainColor = themeColor ? themeColor : null;
  return {
    title,
    description,
    favicon,
    ogImage,
    mainColor,
    url,
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, preferences } = req.body;

  const { value } = preferences[0];
  const url = value;
  // if no string is provided, return an error
  if (typeof url !== "string") {
    res.status(400).json({ error: "No URL provided" });
    return;
  }
  // if the string is not a valid URL, return an error
  try {
    new URL(url);
  } catch (error) {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }
  // if there are multiple URLs, return an error
  if (Array.isArray(url)) {
    res.status(400).json({ error: "Multiple URLs provided" });
    return;
  }
  // get the metadata
  const metadata = await getUrlMetadata(url);
  if(!metadata.title || !metadata.description) {
    res.status(404).json({ error: "URL is not supported yet" });
  }
  res.status(200).json(metadata);
};
