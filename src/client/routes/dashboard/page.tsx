import Banner from "../../components/Banner";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Tabs from "../../components/Tabs";
import Title from "../../components/Title";

const Dashboard = () => {
  return (
    <>
      <Tabs />
      <Content>
        <Container>
          <Banner />
          <Title />
        </Container>
      </Content>
    </>
  );
};

export default Dashboard;
