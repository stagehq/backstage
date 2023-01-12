import { Block, List } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeExtensionTitle } from "../components/studio/hooks/useChangeExtensionTitle";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { Extension } from "../graphql/types.generated";

interface BlogProps {
  extension: Extension;
  size: 1 | 2 | 3;
}

const Blogs: FC<BlogProps> = ({ extension, size }) => {
  const [data, setData] = useState<any[]>([]);
  const [profileLink, setProfileLink] = useState("");

  const changeExtensionTitle = useChangeExtensionTitle();
  const changeExtensionSize = useChangeExtensionSize();

  useEffect(() => {
    if (extension.underlayingApis) {
      let blogPosts: any[] = [];

      extension.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "devto") {
          api.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.forEach((post: any) => {
              // get post.url and shorten it to the profilelink
              if (profileLink === "") {
                setProfileLink("https://dev.to/" + post.user.username + "/");
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
      });

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
    }
  }, [extension]);

  return (
    <Block
      actions={{ link: { url: profileLink } }}
      handleTitleChange={(title) => changeExtensionTitle(extension.id, title)}
      handleSizeChange={(size) => changeExtensionSize(extension.id, size)}
      title={"Open Source"}
      imagePath={"https://avatars.githubusercontent.com/u/65030610?s=200&v=4"}
      size={size}
    >
      <List>
        {data.map((post, index) => (
          <List.Item
            type={post.type}
            title={post.title}
            additional={post.additional}
            subtitle={post.subtitle}
            key={`Block-${index}`}
            actions={{ open: { url: "https://dev.to" } }}
          />
        ))}
      </List>
    </Block>
  );
};

export default Blogs;
