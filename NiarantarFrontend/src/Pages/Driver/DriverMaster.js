import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import DriverTable from "./DriverMasterTable";
import axios from "axios";

const DriverMaster = () => {
  const [data, setData] = useState([]);
  const containerStyle = {
    display: "flex",
  };
  const tableStyle = {
    width: "80%",
    margin: "auto",
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/getDriver").then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, [data]);

  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
      </div>
      <div style={tableStyle}>
        <Header />
        <DriverTable data={data} />
      </div>
    </div>
  );
};

export default DriverMaster;
