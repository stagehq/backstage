import SidebarItemWrapper from "../SidebarItemWrapper";
import StatusMeetingList from "./StatusMeetingList";

const StatusMeetingItem = () => {
  return (
    <div className="">
      <SidebarItemWrapper title="Status meeting">
        <StatusMeetingList />
      </SidebarItemWrapper>
    </div>
  );
};

export default StatusMeetingItem;
