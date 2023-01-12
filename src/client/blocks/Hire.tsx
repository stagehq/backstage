import { Action, Actions, Cards, Section } from "@stagehq/ui";
import { useState } from "react";

interface HireProps {
  title: string;
  subtitle: string;
  link: string;
  text: string;
}

const Hire = () => {
  const dataHire = {
    title: "Hire me!",
    subtitle:
      "I build web apps for startups, businesses and public institutions as a freelance web developer and designer. Let's discuss your needs and see how I can help.",
    link: "mailto:kontakt@felixhaeberle.de",
    text: "Contect me",
  };
  const [data, setData] = useState<HireProps>(dataHire);

  return (
    <Section>
      <Cards>
        <Cards.Item
          type="vertical"
          title={data.title}
          subtitle={data.subtitle}
          icon="BoltIcon"
          actions={
            <Actions>
              <Action.Button
                link={data.link}
                text={data.text}
                icon="EnvelopeIcon"
                primary
              />
            </Actions>
          }
        />
      </Cards>
    </Section>
  );
};

export default Hire;

//   icon: "UserIcon",
