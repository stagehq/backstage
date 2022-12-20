import { Header, List, Section, Seperator } from "@stagehq/ui";
import { useEffect, useState } from "react";

const Resume = (props: { underlayingApis: unknown; }) => {
  const [experience, setExperience] = useState<any[]>([]);
  const [university, setUniversity] = useState<any[]>([]);

  useEffect(() => {
    if (props.underlayingApis) {
      let jobs: any[] = [];
      let education: any[] = [];
      
      props.underlayingApis?.forEach((api: { apiConnector: { name: string; }; apiResponses: any[]; }) => {
        if (api.apiConnector?.name === "linkedin") {
          api.apiResponses.forEach((apiResponse: { response: any[]; }) => {
            apiResponse.response.experiences.forEach((job: any) => {
              jobs.push({
                type: "bullet",
                title: job.title,
                subtitle: job.company,
                additional: job.starts_at.year,
                image: job.logo_url,
              });
            });
            apiResponse.response.education.forEach((edu: any) => {
              education.push({
                type: "bullet",
                title: edu.field_of_study + " - " + edu.degree,
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
      console.log(experience)
    }
  }, [props.underlayingApis]);


  return (
    <Section>
      <Header title="Experience" icon="BriefcaseIcon" />
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
    </Section>
  );
}

export default Resume;