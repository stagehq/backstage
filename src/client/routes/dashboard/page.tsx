import Container from "../../components/Container";
import DashboardHeader from "../../components/DashboardHeader";
import GridList from "../../components/GridList";
import ListHeader from "../../components/ListHeader";
import Title from "../../components/Title";

const Dashboard = () => {
  return (
    <>
      <div>
        <DashboardHeader />
        <Container>
          <Title />
          <ListHeader />
          <GridList />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
