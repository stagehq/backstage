import { useRecoilValue } from "recoil";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Tabs from "../../components/Tabs";
import { currentUserState } from "../../store/user";

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

const Banner = () => {
  return (
    <div className="mt-6 w-full">
      <img className="w-full h-full" src="/images/app/banner.png" alt="banner" />
    </div>
  );
};

const Title = () => {
  // get current user from recoil state
  const user = useRecoilValue(currentUserState);

  if (!user) return null;

  return (
    <div className="flex justify-between items-end w-full mt-10">
    <div
      className="flex flex-col justify-start items-start relative gap-[3px]"
    >
      <p className="text-xl lg:text-2xl font-semibold text-left text-zinc-900">
        {user.firstName}'s portfolio website
      </p>
      <div className="flex justify-start items-center relative gap-3">
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="7" cy="7.5" r="7" fill="#04D187"></circle>
        </svg>
        <p className="text-sm font-medium text-left text-zinc-500">
          Created 2 weeks ago
        </p>
      </div>
    </div>
    <div
      className="flex justify-start items-start relative gap-2 px-4 py-2 rounded border border-[#dcdcdc]"
    >
      <p className="text-sm font-medium text-left text-zinc-900">Edit</p>
    </div>
  </div>
  )
}

export default Dashboard;
