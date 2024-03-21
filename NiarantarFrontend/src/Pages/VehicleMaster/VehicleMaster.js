import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"; // Assuming the correct path to your Sidebar component
import VehicleMasterTable from "./VehicleMasterTable";
import Header from "../../Components/Header/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { showSuccess } from "../../toast";

const LocationMaster = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const [data, setData] = useState([]);
  const containerStyle = {
    display: "flex",
  };

  const tableStyle = {
    width: "80%",
    margin: "auto",
  };

  const headerstyle = {
    width: "100%",
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicle")
      .then((response) => {
        if (searchValue === "") {
          setData(response.data.data);
        } else {
          // Use filter to get an array of all matching elements
          const filteredData = response.data.data.filter(
            (veh) => veh.vehicleType === searchValue
          );
          setData(filteredData);
          if (filteredData.length == 0) {
            showSuccess(`No Data found of ${searchValue} vehicle type`);
          }
        }
        console.log("data set");
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [searchValue]);

  console.log(data);

  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
      </div>

      <div style={tableStyle}>
        <div style={headerstyle}>
          <Header />
        </div>
        <div>
          <VehicleMasterTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default LocationMaster;
