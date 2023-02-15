import { NextApiRequest, NextApiResponse } from "next";
import { reseedDatabase } from "../../../test/seed";
import {
  apiConnectorsData,
  storeExtensionsData,
} from "../../../test/seed/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(500).json({ result: "Not in dev mode" });
  } else {
    await reseedDatabase(apiConnectorsData, storeExtensionsData);
    return res.status(500).json({ result: "Data seeded" });
  }
};
