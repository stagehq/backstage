import Banner from "../../components/Banner";
import Container from "../../components/Container";
import Content from "../../components/Content";
import More from "../../components/More";
import Title from "../../components/Title";

const Dashboard = () => {
  return (
    <>
      <Content>
        <Container>
          <Banner />
          <Title />
          <More />
        </Container>
      </Content>
    </>
  );
};

export default Dashboard;
