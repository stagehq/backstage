import { useEffect } from "react";
import useSWR from "swr";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import Content from "../../components/Content";
import More from "../../components/More";
import Title from "../../components/Title";

const useLinkedin = (url: string) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/linkedin?url=` + url,
    fetcher
  );
  return {
    user: data,
    isLoading,
    isError: error,
  };
};

const Dashboard = () => {
  const { user, isLoading, isError } = useLinkedin(
    "https://linkedin.com/in/brunocampos01"
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

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
