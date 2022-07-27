import TopBar from "components/Topbar/Topbar";
import RightBar from "components/Rightbar/Rightbar";
import Sidebar from "components/Sidebar/Sidebar";
import Feed from "components/Feed/Feed";

function Home() {
  return (
    <>
      <TopBar />
      <div className="flex">
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}

export default Home;
