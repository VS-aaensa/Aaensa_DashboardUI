import React from "react";
import LeftMenuList from "./LeftMenuList";
import TopNavbar from "./TopNavbar";
import Forgot from "../Pages/Authentication/Forgot";
import Reports from "../Pages/Reports";
import GatewayTable from "../Pages/Enterprise/Enterprise";

function Merger() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <LeftMenuList />
      <div className="flex flex-col flex-1 w-full">
        <TopNavbar />
        {/* <Forgot/> */}
        {/* <Reports /> */}
       <GatewayTable/>
      </div>
    </div>
  );
}

export default Merger;
