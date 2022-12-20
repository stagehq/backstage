import { Action, Actions, Header, List, Section } from "@stagehq/ui";
import { useEffect, useState } from "react";
import { Api } from "../graphql/types.generated";

const Blogs = (props: { underlayingApis: Api[] }) => {
  const [data, setData] = useState<any[]>([]);
  const [profileLink, setProfileLink] = useState("");
  const [linkSource, setLinkSource] = useState("");

  useEffect(() => {
    if (props.underlayingApis) {
      let blogPosts: any[] = [];

      props.underlayingApis?.forEach(
        (api) => {
          if (api.apiConnector?.name === "dev") {
            api.apiResponses?.forEach((apiResponse) => {
              apiResponse.response.forEach((post: any) => {
                // get post.url and shorten it to the profilelink
                if (profileLink === "") {
                  setProfileLink("https://dev.to/" + post.user.username + "/");
                  setLinkSource("DEV.to");
                }
                blogPosts.push({
                  source: "DEV.to",
                  type: "text",
                  title: post.title,
                  subtitle: post.description,
                  additional: post.readable_publish_date,
                  published_at: post.published_at,
                  url: post.url,
                });
              });
            });
          }
        }
      );

      // sort by published_at
      blogPosts.sort((a, b) => b.published_at - a.published_at);

      // remove duplicates
      blogPosts = blogPosts.filter(
        (post, index, self) =>
          index === self.findIndex((t) => t.title === post.title)
      );

      // reduce to 3 items for now
      if (blogPosts.length > 3) {
        blogPosts = blogPosts.slice(0, 3);
      }

      setData(blogPosts);
      console.log(data);
    }
  }, [props.underlayingApis]);

  return (
    <Section>
      <Header
        title="Recent Blogs"
        icon="BookOpenIcon"
        actions={
          <Actions>
            <Action.Link url={profileLink} text={linkSource} />
          </Actions>
        }
      />
      <List>
        {data.map((post: any, index) => (
          <List.Item
            type={post.type}
            title={post.title}
            additional={post.additional}
            subtitle={post.subtitle}
            actions={<Action.Link url={post.url} text="Read article" />}
            key={"blogPosts" + index}
          />
        ))}
      </List>
    </Section>
  );
};

export default Blogs;
