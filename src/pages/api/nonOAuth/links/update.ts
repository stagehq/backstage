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

async function checkImage(url: string): Promise<string | null> {
  const response = await fetch(url, { method: "HEAD" });
  return response.status >= 200 && response.status < 300 ? url : null;
}

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
  if (favicon) {
    favicon = await checkImage(favicon);
  }
  let ogImage =
    document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content") || null;
  if (ogImage && ogImage.startsWith("/")) {
    ogImage = `${domain.origin}${ogImage}`;
  }
  if (ogImage) {
    ogImage = await checkImage(ogImage);
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
  if (!metadata.title || !metadata.description) {
    res.status(404).json({ error: "URL is not supported yet" });
  }
  res.status(200).json(metadata);
};
