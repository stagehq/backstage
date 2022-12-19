import { Action, Actions, Header, List, Section } from "@stagehq/ui";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { siteSlugState, siteState } from "../store/site";

const Repositories = () => {
  const { siteId } = useParams();

  const [siteSlug, setSiteSlug] = useRecoilState(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (siteId) {
      setSiteSlug(siteId);
    }
  }, [siteId, setSiteSlug]);

  useEffect(() => {
    if (site) {
      let mergedData = [];

      // merge data from GitHub and GitLab
      site.extensions[0].underlayingApis?.forEach((underlayingApi) => {
        if (underlayingApi.apiConnector?.name === "GitHub") {
          underlayingApi.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.forEach((repository) => {
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
        if (underlayingApi.apiConnector?.name === "GitLab") {
          underlayingApi.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.forEach((repository) => {
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

      // reduce to 3 items for now
      mergedData = mergedData.slice(0, 3);

      setData(mergedData);
      console.log(data);
    }
  }, [site]);

  // map all project languages to array of strings for pills component an filter out duplicates
  // const languages = Object.entries(data)
  //   .map(project => project[1].language)
  //   .filter((language, index, self) => self.indexOf(language) === index);

  return (
    data && (
      <Section>
        <Header
          title="Open Source"
          icon="CodeBracketSquareIcon"
          actions={
            <Actions>
              <Action.Link url="https://github.com" text="GitHub profile" />
            </Actions>
          }
        />
        {/* <Pills
          pills={languages}
        /> */}
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
