import { Block, List } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeExtensionTitle } from "../components/studio/hooks/useChangeExtensionTitle";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { BlockProps } from "./type";

const Repositories: FC<BlockProps> = ({ extension, size, isEditable }) => {
  const [data, setData] = useState<any[]>([]);
  const [profileLink, setProfileLink] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  const changeExtensionTitle = useChangeExtensionTitle();
  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

  useEffect(() => {
    if (extension.underlayingApis) {
      let mergedData: any[] = [];
      let collectLanguages: any[] = [];

      extension.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "gitlab") {
          api.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.forEach((repository: any) => {
              if (profileLink === "") {
                setProfileLink(repository.namespace.web_url);
              }
              mergedData.push({
                source: "GitLab",
                url: repository.web_url,
                name: repository.name,
                full_name: repository.path_with_namespace,
                description: repository.description,
                star_count: repository.star_count,
              });
            });
          });
        }
      });

      /* TODO: Fix repositories not complete therefore this doesnt work as expected */
      // sort by star count
      mergedData.sort((a, b) => b.star_count - a.star_count);

      // remove duplicates
      mergedData = mergedData.filter(
        (repository, index, self) =>
          self.findIndex((t) => t.name === repository.name) === index
      );
      collectLanguages = collectLanguages.filter(
        (language, index, self) =>
          self.findIndex((t) => t === language) === index
      );

      // reduce to 3 items for now
      if (mergedData.length > 3) {
        mergedData = mergedData.slice(0, 3);
      }
      if (languages.length > 5) {
        collectLanguages = collectLanguages.slice(0, 5);
      }
      console.log(mergedData);

      setLanguages(collectLanguages);
      setData(mergedData);
    }
  }, [extension]);

  return (
    data && (
      <Block
        title="Repositories"
        actions={{ link: { url: profileLink } }}
        size={size}
        isEditable={isEditable}
        handleTitleChange={(title) => changeExtensionTitle(extension.id, title)}
        handleSizeChange={(size) => changeExtensionSize(extension.id, size)}
        handleDelete={() => deleteExtension(extension.id)}
        imagePath={"https://avatars.githubusercontent.com/u/9919?s=200&v=4"}
      >
        <List>
          {data.map((project, index) => (
            <List.Item
              type={"card"}
              title={project.name}
              additional={project.full_name}
              subtitle={project.description}
              count={{
                value: project.star_count,
                icon: "StarIcon",
              }}
              actions={{ open: { url: project.url } }}
              key={"repository" + index}
            />
          ))}
        </List>
      </Block>
    )
  );
};

export default Repositories;
