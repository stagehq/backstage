import { NextApiRequest, NextApiResponse } from "next";
import { reseedDatabase } from "../../../test/seed";
import {
  apiConnectorsData,
  storeExtensionsData,
} from "../../../test/seed/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await reseedDatabase(apiConnectorsData, storeExtensionsData);
  return res.status(500).json({ result: "Data seeded" });
};
