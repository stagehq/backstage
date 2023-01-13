import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Container from "../../components/Container";
import DashboardHeader from "../../components/DashboardHeader";
import GridList from "../../components/GridList";
import ListHeader from "../../components/ListHeader";
import Title from "../../components/Title";
import { currentUserState } from "../../store/user";

const Dashboard = () => {

  const user = useRecoilValue(currentUserState);

  useEffect(()=>{
    console.log(user);
  },[user])

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
