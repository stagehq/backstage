import { Action, Actions, Header, List, Section } from "@stagehq/ui";
import { useEffect, useState } from "react";
import { Api } from "../graphql/types.generated";

const Repositories = (props: { underlayingApis: Api[] }) => {
  const [data, setData] = useState<any[]>([]);
  const [profileLink, setProfileLink] = useState("");
  const [linkSource, setLinkSource] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (props.underlayingApis) {
      let mergedData: any[] = [];
      let collectLanguages: any[] = [];

      // merge data from GitHub and GitLab
      props.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "github") {
          api.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.forEach((repository: any) => {
              if (profileLink === "") {
                setProfileLink(repository.owner.html_url);
                setLinkSource("GitHub");
              }
              if (repository.language) {
                collectLanguages.push(repository.language);
              }
              mergedData.push({
                source: "GitHub",
                url: repository.html_url,
                name: repository.name,
                full_name: repository.full_name,
                description: repository.description,
                star_count: repository.stargazers_count,
              });
            });
          });
        }
        if (api.apiConnector?.name === "gitlab") {
          api.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.forEach((repository: any) => {
              if (profileLink === "") {
                setProfileLink(repository.namespace.web_url);
                setLinkSource("GitLab");
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

      setLanguages(collectLanguages);
      setData(mergedData);
    }
  }, [props.underlayingApis]);

  return (
    data && (
      <Section>
        <Header
          title="Open Source"
          icon="CodeBracketSquareIcon"
          actions={
            <Actions>
              <Action.Link url={profileLink} text={`${linkSource} profile`} />
            </Actions>
          }
        />
        {/* {languages.length > 0 && <Pills pills={languages} />} */}
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
              actions={
                <Actions>
                  <Action.Link
                    url={project.url}
                    text={`View on ${project.source}`}
                  />
                </Actions>
              }
              key={"repository" + index}
            />
          ))}
        </List>
      </Section>
    )
  );
};

export default Repositories;
