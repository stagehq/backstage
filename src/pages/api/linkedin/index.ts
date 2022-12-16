// nextjs api route for linkedin

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query
  console.log(req.body);

  // fetch linkedin profile data with this url https://nubela.co/proxycurl/api/v2/linkedin and store in data
  const params = new URLSearchParams({'url': `${url}`,
  'fallback_to_cache': 'on-error',
  'use_cache': 'if-present',
  'skills': 'include',
  'inferred_salary': 'include',
  'personal_email': 'include',
  'personal_contact_number': 'include',
  'twitter_profile_id': 'include',
  'facebook_profile_id': 'include',
  'github_profile_id': 'include',
  'extra': 'include'});


  const profileData = await fetch("https://nubela.co/proxycurl/api/v2/linkedin?" + params, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + process.env.PROXYCURL_TOKEN,
    },
  }).then((response) => response.json())

  res.status(200).json({ profile: profileData });
};
