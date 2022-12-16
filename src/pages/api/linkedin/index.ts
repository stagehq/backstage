// nextjs api route for linkedin

import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query

  // return url for testing
  res.status(200).json({ url: url });

  // // fetch linkedin profile data with this url https://nubela.co/proxycurl/api/v2/linkedin and store in data
  // fetch("https://nubela.co/proxycurl/api/v2/linkedin", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Basic " + process.env.NUBELA_API_KEY,
  //   },
  //   body: JSON.stringify({
  //     url: url,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // if data has errors, throw error
  //     if (data.errors[0]) {
  //       throw "error";
  //     } else {
  //       // else return data
  //       res.status(200).json(data);
  //     }
  //   })
  //   .catch(() => {
  //     res.status(400).json({});
  //   }
  // );
};
