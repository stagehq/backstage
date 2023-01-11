import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
// nextjs api route for linkedin

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, preferences } = req.body;

  console.log(preferences);

  const { value } = preferences[0];

  // fetch linkedin profile data with this url https://nubela.co/proxycurl/api/v2/linkedin and store in data

  const url = "https://nubela.co/proxycurl" + route;

  try {
    const response = await wretch(url)
      .addon(QueryStringAddon)
      .auth(`Bearer ${process.env.LINKEDIN_CLIENT_SECRET}`)
      .query({
        url: `${value}`,
        fallback_to_cache: "on-error",
        use_cache: "if-present",
        skills: "include",
        inferred_salary: "include",
        personal_email: "include",
        personal_contact_number: "include",
        twitter_profile_id: "include",
        facebook_profile_id: "include",
        github_profile_id: "include",
        extra: "include",
      })
      .get()
      .json();

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
