import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"; // Assuming the correct path to your Table component
import FuelTable from "./FuelTable";
import Header from "../../Components/Header/Header";
import axios from "axios";

const FuelMaster = () => {
  const [data, setData] = useState([]);
  const containerStyle = {
    display: "flex",
  };

  const tableStyle = {
    width: "80%",
    margin: "auto",
  };

  const get_data = async () => {
    await axios
      .get("http://localhost:5000/api/fuels")
      .then((response) => {
        console.log("fueldata", response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };
  useEffect(() => {
    get_data();
  }, []);

  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
      </div>
      <div style={tableStyle}>
        <Header />
        <FuelTable data={data} />
      </div>
    </div>
  );
};

export default FuelMaster;
