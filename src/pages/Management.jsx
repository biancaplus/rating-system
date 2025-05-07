import Navigator from "@/components/Navigator";
import SidebarMenu from "@/components/Management/SidebarMenu";
import { Outlet } from "react-router-dom";

const Management = () => {
  return (
    <>
      <Navigator />
      <div
        className="d-flex overflow-hidden box-sizing-border-box"
        style={{ paddingTop: "64px", height: "100vh", width: "100%" }}
      >
        <SidebarMenu />
        <div
          className="flex-grow-1 p-3 box-sizing-border-box"
          style={{
            minWidth: 0,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Management;
