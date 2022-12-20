import { Action, Actions, Header, List, Section } from "@stagehq/ui";
import { blogPosts } from "../components/sidebars/testData";

const Blogs = (props: { underlayingApis: unknown; }) => {
  return (
    <Section>
      <Header
        title="Recent Blogs"
        icon="BookOpenIcon"
        actions={
          <Actions>
            <Action.Link url="https://google.com" text="DEV.to" />
          </Actions>
        }
      />
      <List>
        {blogPosts.map((post: any, index) => (
          <List.Item
            type={post.type}
            title={post.title}
            additional={post.additional}
            subtitle={post.subtitle}
            actions={
              <Action.Link url="https://google.com" text="Read article" />
            }
            key={"blogPosts" + index}
          />
        ))}
      </List>
    </Section>
  );
}

export default Blogs;

// {
//   icon: "DocumentIcon",
//   apis: [ExtensionAPIEnum.MEDIUM, ExtensionAPIEnum.DEVTO],
// },