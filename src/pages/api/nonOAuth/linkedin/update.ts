// nextjs api route for linkedin

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {route, preferences} = await JSON.parse(req.body);

  // fetch linkedin profile data with this url https://nubela.co/proxycurl/api/v2/linkedin and store in data
  const params = new URLSearchParams({
    url: `${preferences.url}`,
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
  });

  const response = await fetch(
    route + "?" + params,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.PROXYCURL_TOKEN,
      },
    }
  ).then((response) => response.json());

  res.status(200).json(response);
};
