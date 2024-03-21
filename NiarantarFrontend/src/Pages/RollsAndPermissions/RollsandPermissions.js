import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import RollsAndPermissionTable from "./RollPermissionsTable";
import axios from "axios";

const RollsandPermissions = () => {
  const [data, setData] = useState([]);
  const containerStyle = {
    display: "flex",
  };


  const tableStyle = {
    width: "80%",margin:'auto'
  };

  return (
    <div style={containerStyle}>
      <div >
        <Sidebar />
      </div>
      <div style={tableStyle}>
        <Header />
        <RollsAndPermissionTable />
      </div>
    </div>
  );
};

export default RollsandPermissions;
