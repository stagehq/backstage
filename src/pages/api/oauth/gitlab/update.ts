// nextjs api route for gitlab

import type { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { route, token, preferences } = req.body;

    interface GitLabUser {
      id: number;
      username: string;
      name: string;
      state: string;
      avatar_url: string;
      web_url: string;
      created_at: Date;
      bio: string;
      location: string;
      public_email: string;
      skype: string;
      linkedin: string;
      twitter: string;
      discord: string;
      website_url: string;
      organization: string;
      job_title: string;
      pronouns: string;
      bot: boolean;
      work_information: string;
      followers: number;
      following: number;
      is_followed: boolean;
      local_time: string;
      last_sign_in_at: Date;
      confirmed_at: Date;
      last_activity_on: string;
      email: string;
      theme_id: number;
      color_scheme_id: number;
      projects_limit: number;
      current_sign_in_at: Date;
      identities: any[];
      can_create_group: boolean;
      can_create_project: boolean;
      two_factor_enabled: boolean;
      external: boolean;
      private_profile: boolean;
      commit_email: string;
      shared_runners_minutes_limit?: any;
      extra_shared_runners_minutes_limit?: any;
    }

    // fetch user.id from /user
    const user: GitLabUser = await wretch(
      `https://gitlab.com/api/v4/user?access_token=${token}`
    )
      .headers({
        Accept: "application/json",
      })
      .get()
      .json();

    // exchange "user_id" with user.id
    const userRoute = route.replace("user_id", user.id);

    const response = await wretch("https://gitlab.com" + userRoute)
      .headers({
        Accept: "application/json",
        test: `Bearer ${token}`,
      })
      .get()
      .json();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
