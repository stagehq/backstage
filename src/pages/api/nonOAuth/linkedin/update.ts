// nextjs api route for linkedin

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { route, preferences } = await JSON.parse(req.body);

  const linkedinUrl = preferences.find(
    (x: { key: string; value: string }) => x.key === "linkedinUrl"
  ).value;

  // fetch linkedin profile data with this url https://nubela.co/proxycurl/api/v2/linkedin and store in data
  const params = new URLSearchParams({
    url: `${linkedinUrl}`,
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

  const url = "https://nubela.co/proxycurl" + route + "?" + params;
  console.log(url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + process.env.LINKEDIN_CLIENT_SECRET,
    },
  }).then((response) => response.json());

  res.status(200).json(response);
};
