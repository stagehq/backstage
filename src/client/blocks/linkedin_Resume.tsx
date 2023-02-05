import { Block, List, Seperator } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeExtensionTitle } from "../components/studio/hooks/useChangeExtensionTitle";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { BlockProps } from "./type";

const Resume: FC<BlockProps> = ({ gridRef, extension, size, isEditable }) => {
  const [experience, setExperience] = useState<any[]>([]);
  const [university, setUniversity] = useState<any[]>([]);

  const changeExtensionTitle = useChangeExtensionTitle();
  const changeExtensionSize = useChangeExtensionSize();

  useEffect(() => {
    if (extension.underlayingApis) {
      let jobs: any[] = [];
      let education: any[] = [];

      extension.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "linkedin") {
          api.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.experiences &&
              apiResponse.response.experiences.forEach((job: any) => {
                jobs.push({
                  type: "bullet",
                  title: job.title,
                  subtitle: job.company,
                  additional: job.starts_at.year,
                  image: job.logo_url,
                });
              });
            apiResponse.response.education &&
              apiResponse.response.education.forEach((edu: any) => {
                education.push({
                  type: "bullet",
                  title: (edu.degree !== undefined) ? edu.field_of_study + " - " + edu.degree : edu.field_of_study,
                  subtitle: edu.school,
                  additional: edu.starts_at?.year ? edu.starts_at.year : "",
                  image: edu.logo_url,
                });
              });
          });
        }
      });

      // sort by additional
      jobs.sort((a, b) => b.additional - a.additional);
      education.sort((a, b) => b.additional - a.additional);

      // reduce to 3 items for now
      if (jobs.length > 3) {
        jobs = jobs.slice(0, 3);
      }

      if (education.length > 3) {
        education = education.slice(0, 3);
      }

      setExperience(jobs);
      setUniversity(education);
    }
  }, [extension]);

  return (
    <Block
      actions={{
        link: { url: "https://www.linkedin.com/in/alexander-herzog/" },
      }}
      title={"Experience"}
      size={size}
      isEditable={isEditable}
      handleTitleChange={(title) => changeExtensionTitle(extension.id, title)}
      handleSizeChange={(size) =>
        changeExtensionSize(extension.id, size, gridRef)
      }
      imagePath={"https://avatars.githubusercontent.com/u/357098?s=200&v=4"}
    >
      <List>
        {experience.map((job: any, index) => (
          <List.Item
            type={job.type}
            title={job.subtitle}
            subtitle={job.title}
            additional={job.additional}
            image={job.image}
            key={"experience" + index}
          />
        ))}
      </List>
      <Seperator />
      <List>
        {university.map((edu: any, index) => (
          <List.Item
            type={edu.type}
            title={edu.title}
            subtitle={edu.subtitle}
            additional={edu.additional}
            image={edu.image}
            key={"university" + index}
          />
        ))}
      </List>
    </Block>
  );
};

export default Resume;
