import { Block, List } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeExtensionTitle } from "../components/studio/hooks/useChangeExtensionTitle";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { BlockProps } from "./type";

const Blogs: FC<BlockProps> = ({ gridRef, extension, size, isEditable }) => {
  const [data, setData] = useState<any[]>([]);
  const [profileLink, setProfileLink] = useState("");

  const changeExtensionTitle = useChangeExtensionTitle();
  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

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
                additional: new Date(post.readable_publish_date)
                  .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .toString(),
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
      handleSizeChange={(size) => changeExtensionSize(extension.id, size, gridRef)}
      handleDelete={() => deleteExtension(extension.id)}
      title={"Blog Posts"}
      imagePath={"https://avatars.githubusercontent.com/u/65030610?s=200&v=4"}
      size={size}
      isEditable={isEditable}
    >
      <List>
        {data.map((post, index) => (
          <List.Item
            type={post.type}
            title={post.title}
            additional={post.additional}
            subtitle={post.subtitle}
            key={`Block-${index}`}
            actions={{ open: { url: post.url } }}
          />
        ))}
      </List>
    </Block>
  );
};

export default Blogs;
